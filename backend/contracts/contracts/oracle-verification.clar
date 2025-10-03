;; 🔮 Genomic Platform - Oracle Verification Contract
;; External data source verification and consensus management

;; Contract constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u200))
(define-constant err-not-authorized (err u201))
(define-constant err-invalid-oracle (err u202))
(define-constant err-consensus-failed (err u203))
(define-constant min-consensus-threshold u75) ;; 75% consensus required

;; Data variables
(define-data-var oracle-count uint u0)
(define-data-var verification-nonce uint u0)

;; Authorized oracles map
(define-map authorized-oracles
  { oracle-address: principal }
  { 
    active: bool,
    reputation-score: uint,
    total-verifications: uint,
    successful-verifications: uint,
    added-at: uint
  }
)

;; Gene verification consensus
(define-map gene-verifications
  { gene-symbol: (string-ascii 20), verification-id: uint }
  {
    oracle: principal,
    verified: bool,
    ncbi-gene-id: (optional (string-ascii 32)),
    confidence: uint,
    timestamp: uint,
    external-sources: (list 5 (string-ascii 20))
  }
)

;; Variant verification consensus  
(define-map variant-verifications
  { variant-id: (string-ascii 64), verification-id: uint }
  {
    oracle: principal,
    verified: bool,
    clinical-significance: (optional (string-ascii 32)),
    population-frequency: (optional uint),
    confidence: uint,
    timestamp: uint
  }
)

;; Consensus results
(define-map consensus-results
  { data-type: (string-ascii 10), data-id: (string-ascii 64) }
  {
    consensus-reached: bool,
    verification-count: uint,
    positive-verifications: uint,
    final-confidence: uint,
    consensus-timestamp: uint
  }
)

;; Public functions

;; Add authorized oracle (owner only)
(define-public (add-oracle (oracle-address principal))
  (if (is-eq tx-sender contract-owner)
    (begin
      (map-set authorized-oracles
        { oracle-address: oracle-address }
        {
          active: true,
          reputation-score: u100,
          total-verifications: u0,
          successful-verifications: u0,
          added-at: block-height
        }
      )
      (var-set oracle-count (+ (var-get oracle-count) u1))
      (ok oracle-address)
    )
    err-owner-only
  )
)

;; Submit gene verification
(define-public (submit-gene-verification
  (gene-symbol (string-ascii 20))
  (verified bool)
  (ncbi-gene-id (optional (string-ascii 32)))
  (confidence uint)
  (external-sources (list 5 (string-ascii 20))))
  
  (let ((oracle-info (map-get? authorized-oracles { oracle-address: tx-sender }))
        (current-nonce (var-get verification-nonce)))
    
    (if (and (is-some oracle-info) (get active (unwrap! oracle-info err-not-authorized)))
      (begin
        (map-set gene-verifications
          { gene-symbol: gene-symbol, verification-id: current-nonce }
          {
            oracle: tx-sender,
            verified: verified,
            ncbi-gene-id: ncbi-gene-id,
            confidence: confidence,
            timestamp: block-height,
            external-sources: external-sources
          }
        )
        (var-set verification-nonce (+ current-nonce u1))
        
        ;; Update oracle stats
        (update-oracle-stats tx-sender true)
        
        ;; Check for consensus
        (try! (check-gene-consensus gene-symbol))
        
        (ok current-nonce)
      )
      err-not-authorized
    )
  )
)

;; Submit variant verification
(define-public (submit-variant-verification
  (variant-id (string-ascii 64))
  (verified bool)
  (clinical-significance (optional (string-ascii 32)))
  (population-frequency (optional uint))
  (confidence uint))
  
  (let ((oracle-info (map-get? authorized-oracles { oracle-address: tx-sender }))
        (current-nonce (var-get verification-nonce)))
    
    (if (and (is-some oracle-info) (get active (unwrap! oracle-info err-not-authorized)))
      (begin
        (map-set variant-verifications
          { variant-id: variant-id, verification-id: current-nonce }
          {
            oracle: tx-sender,
            verified: verified,
            clinical-significance: clinical-significance,
            population-frequency: population-frequency,
            confidence: confidence,
            timestamp: block-height
          }
        )
        (var-set verification-nonce (+ current-nonce u1))
        
        ;; Update oracle stats
        (update-oracle-stats tx-sender true)
        
        ;; Check for consensus
        (try! (check-variant-consensus variant-id))
        
        (ok current-nonce)
      )
      err-not-authorized
    )
  )
)

;; Private functions

;; Update oracle statistics
(define-private (update-oracle-stats (oracle-address principal) (successful bool))
  (match (map-get? authorized-oracles { oracle-address: oracle-address })
    oracle-info
    (let ((new-total (+ (get total-verifications oracle-info) u1))
          (new-successful (if successful 
                             (+ (get successful-verifications oracle-info) u1)
                             (get successful-verifications oracle-info))))
      (map-set authorized-oracles
        { oracle-address: oracle-address }
        (merge oracle-info {
          total-verifications: new-total,
          successful-verifications: new-successful,
          reputation-score: (calculate-reputation new-successful new-total)
        })
      )
    )
    false
  )
)

;; Calculate reputation score
(define-private (calculate-reputation (successful uint) (total uint))
  (if (is-eq total u0)
    u100
    (/ (* successful u100) total)
  )
)

;; Check gene consensus
(define-private (check-gene-consensus (gene-symbol (string-ascii 20)))
  (let ((verification-count (count-gene-verifications gene-symbol))
        (positive-count (count-positive-gene-verifications gene-symbol)))
    
    (if (>= verification-count u3) ;; Minimum 3 verifications required
      (let ((consensus-percentage (/ (* positive-count u100) verification-count)))
        (if (>= consensus-percentage min-consensus-threshold)
          (begin
            (map-set consensus-results
              { data-type: "gene", data-id: gene-symbol }
              {
                consensus-reached: true,
                verification-count: verification-count,
                positive-verifications: positive-count,
                final-confidence: consensus-percentage,
                consensus-timestamp: block-height
              }
            )
            (ok true)
          )
          err-consensus-failed
        )
      )
      (ok false) ;; Not enough verifications yet
    )
  )
)

;; Check variant consensus
(define-private (check-variant-consensus (variant-id (string-ascii 64)))
  (let ((verification-count (count-variant-verifications variant-id))
        (positive-count (count-positive-variant-verifications variant-id)))
    
    (if (>= verification-count u3) ;; Minimum 3 verifications required
      (let ((consensus-percentage (/ (* positive-count u100) verification-count)))
        (if (>= consensus-percentage min-consensus-threshold)
          (begin
            (map-set consensus-results
              { data-type: "variant", data-id: variant-id }
              {
                consensus-reached: true,
                verification-count: verification-count,
                positive-verifications: positive-count,
                final-confidence: consensus-percentage,
                consensus-timestamp: block-height
              }
            )
            (ok true)
          )
          err-consensus-failed
        )
      )
      (ok false) ;; Not enough verifications yet
    )
  )
)

;; Helper functions (simplified for demo)
(define-private (count-gene-verifications (gene-symbol (string-ascii 20)))
  ;; In a real implementation, this would iterate through verifications
  ;; For now, returning a placeholder
  u3
)

(define-private (count-positive-gene-verifications (gene-symbol (string-ascii 20)))
  ;; In a real implementation, this would count positive verifications
  ;; For now, returning a placeholder
  u2
)

(define-private (count-variant-verifications (variant-id (string-ascii 64)))
  ;; In a real implementation, this would iterate through verifications
  ;; For now, returning a placeholder
  u3
)

(define-private (count-positive-variant-verifications (variant-id (string-ascii 64)))
  ;; In a real implementation, this would count positive verifications
  ;; For now, returning a placeholder
  u2
)

;; Read-only functions

;; Get oracle info
(define-read-only (get-oracle-info (oracle-address principal))
  (map-get? authorized-oracles { oracle-address: oracle-address })
)

;; Get consensus result
(define-read-only (get-consensus (data-type (string-ascii 10)) (data-id (string-ascii 64)))
  (map-get? consensus-results { data-type: data-type, data-id: data-id })
)

;; Get gene verification
(define-read-only (get-gene-verification (gene-symbol (string-ascii 20)) (verification-id uint))
  (map-get? gene-verifications { gene-symbol: gene-symbol, verification-id: verification-id })
)

;; Get variant verification
(define-read-only (get-variant-verification (variant-id (string-ascii 64)) (verification-id uint))
  (map-get? variant-verifications { variant-id: variant-id, verification-id: verification-id })
)

;; Get contract stats
(define-read-only (get-contract-stats)
  {
    oracle-count: (var-get oracle-count),
    verification-nonce: (var-get verification-nonce),
    min-consensus: min-consensus-threshold,
    contract-owner: contract-owner
  }
)