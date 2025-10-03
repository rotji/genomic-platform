;; 🧬 Genomic Platform - Data Storage Contract
;; Immutable storage and verification of genomic analysis results

;; Contract constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-exists (err u102))
(define-constant err-invalid-data (err u103))

;; Data variables
(define-data-var contract-active bool true)

;; Data maps
(define-map genomic-analyses 
  { analysis-id: (string-ascii 64) }
  {
    file-hash: (string-ascii 64),
    results-hash: (string-ascii 64),
    analysis-type: (string-ascii 32),
    timestamp: uint,
    oracle-verified: bool,
    submitter: principal,
    metadata: (string-ascii 256)
  }
)

(define-map oracle-verifications
  { data-hash: (string-ascii 64) }
  {
    verified: bool,
    confidence-score: uint,
    external-sources: (list 10 (string-ascii 32)),
    verification-timestamp: uint,
    oracle-signature: (string-ascii 128)
  }
)

(define-map access-permissions
  { user: principal, analysis-id: (string-ascii 64) }
  { can-read: bool, can-share: bool, granted-by: principal, granted-at: uint }
)

;; Public functions

;; Store genomic analysis results
(define-public (store-analysis 
  (analysis-id (string-ascii 64))
  (file-hash (string-ascii 64))
  (results-hash (string-ascii 64))
  (analysis-type (string-ascii 32))
  (metadata (string-ascii 256)))
  
  (let ((existing-analysis (map-get? genomic-analyses { analysis-id: analysis-id })))
    (if (is-some existing-analysis)
      err-already-exists
      (begin
        (map-set genomic-analyses
          { analysis-id: analysis-id }
          {
            file-hash: file-hash,
            results-hash: results-hash,
            analysis-type: analysis-type,
            timestamp: block-height,
            oracle-verified: false,
            submitter: tx-sender,
            metadata: metadata
          }
        )
        (map-set access-permissions
          { user: tx-sender, analysis-id: analysis-id }
          { can-read: true, can-share: true, granted-by: tx-sender, granted-at: block-height }
        )
        (ok analysis-id)
      )
    )
  )
)

;; Store oracle verification
(define-public (store-oracle-verification
  (data-hash (string-ascii 64))
  (verified bool)
  (confidence-score uint)
  (external-sources (list 10 (string-ascii 32)))
  (oracle-signature (string-ascii 128)))
  
  (begin
    (map-set oracle-verifications
      { data-hash: data-hash }
      {
        verified: verified,
        confidence-score: confidence-score,
        external-sources: external-sources,
        verification-timestamp: block-height,
        oracle-signature: oracle-signature
      }
    )
    (ok data-hash)
  )
)

;; Grant access to analysis
(define-public (grant-access
  (analysis-id (string-ascii 64))
  (user principal)
  (can-read bool)
  (can-share bool))
  
  (let ((analysis (map-get? genomic-analyses { analysis-id: analysis-id }))
        (existing-permission (map-get? access-permissions { user: tx-sender, analysis-id: analysis-id })))
    
    (if (and (is-some analysis) 
             (is-some existing-permission)
             (get can-share (unwrap! existing-permission err-not-found)))
      (begin
        (map-set access-permissions
          { user: user, analysis-id: analysis-id }
          { can-read: can-read, can-share: can-share, granted-by: tx-sender, granted-at: block-height }
        )
        (ok true)
      )
      err-not-found
    )
  )
)

;; Read-only functions

;; Get analysis data
(define-read-only (get-analysis (analysis-id (string-ascii 64)))
  (map-get? genomic-analyses { analysis-id: analysis-id })
)

;; Get oracle verification
(define-read-only (get-oracle-verification (data-hash (string-ascii 64)))
  (map-get? oracle-verifications { data-hash: data-hash })
)

;; Check access permission
(define-read-only (has-access (user principal) (analysis-id (string-ascii 64)))
  (match (map-get? access-permissions { user: user, analysis-id: analysis-id })
    permission (get can-read permission)
    false
  )
)

;; Verify analysis integrity
(define-read-only (verify-analysis-integrity 
  (analysis-id (string-ascii 64))
  (expected-file-hash (string-ascii 64))
  (expected-results-hash (string-ascii 64)))
  
  (match (map-get? genomic-analyses { analysis-id: analysis-id })
    analysis (and 
               (is-eq (get file-hash analysis) expected-file-hash)
               (is-eq (get results-hash analysis) expected-results-hash))
    false
  )
)

;; Get analysis count by submitter
(define-read-only (get-analysis-count-by-user (user principal))
  ;; This would require a more complex implementation with maps or lists
  ;; For now, returning a placeholder
  u0
)

;; Admin functions (contract owner only)

;; Deactivate contract
(define-public (deactivate-contract)
  (if (is-eq tx-sender contract-owner)
    (begin
      (var-set contract-active false)
      (ok true)
    )
    err-owner-only
  )
)

;; Activate contract
(define-public (activate-contract)
  (if (is-eq tx-sender contract-owner)
    (begin
      (var-set contract-active true)
      (ok true)
    )
    err-owner-only
  )
)

;; Get contract status
(define-read-only (get-contract-status)
  {
    active: (var-get contract-active),
    owner: contract-owner,
    block-height: block-height
  }
)