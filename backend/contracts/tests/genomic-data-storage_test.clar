;; 🧪 Test suite for genomic-data-storage contract

;; Test storing genomic analysis
(define-public (test-store-analysis)
  (let ((result (contract-call? .genomic-data-storage store-analysis
                  "analysis-001"
                  "sha256:file123abc"
                  "sha256:results456def"
                  "mutation-detection"
                  "BRCA1 analysis for patient")))
    (asserts! (is-ok result) (err "Failed to store analysis"))
    (asserts! (is-eq (unwrap! result (err "Invalid result")) "analysis-001") (err "Wrong analysis ID"))
    (ok true)
  )
)

;; Test retrieving analysis
(define-public (test-get-analysis)
  (let ((analysis (contract-call? .genomic-data-storage get-analysis "analysis-001")))
    (asserts! (is-some analysis) (err "Analysis not found"))
    (let ((data (unwrap! analysis (err "Invalid analysis data"))))
      (asserts! (is-eq (get file-hash data) "sha256:file123abc") (err "Wrong file hash"))
      (asserts! (is-eq (get analysis-type data) "mutation-detection") (err "Wrong analysis type"))
      (ok true)
    )
  )
)

;; Test access permissions
(define-public (test-access-permissions)
  (let ((has-access-result (contract-call? .genomic-data-storage has-access tx-sender "analysis-001")))
    (asserts! has-access-result (err "Should have access to own analysis"))
    (ok true)
  )
)

;; Test oracle verification storage
(define-public (test-store-oracle-verification)
  (let ((result (contract-call? .genomic-data-storage store-oracle-verification
                  "sha256:gene123"
                  true
                  u95
                  (list "ncbi" "clinvar" "ensembl")
                  "signature123abc")))
    (asserts! (is-ok result) (err "Failed to store oracle verification"))
    (ok true)
  )
)

;; Test integrity verification
(define-public (test-verify-integrity)
  (let ((integrity-check (contract-call? .genomic-data-storage verify-analysis-integrity
                           "analysis-001"
                           "sha256:file123abc"
                           "sha256:results456def")))
    (asserts! integrity-check (err "Integrity check failed"))
    (ok true)
  )
)

;; Test duplicate analysis prevention
(define-public (test-duplicate-prevention)
  (let ((result (contract-call? .genomic-data-storage store-analysis
                  "analysis-001"  ;; Same ID as before
                  "sha256:different123"
                  "sha256:different456"
                  "gc-content"
                  "Different analysis")))
    (asserts! (is-err result) (err "Should prevent duplicate analysis IDs"))
    (ok true)
  )
)

;; Run all tests
(define-public (run-all-tests)
  (begin
    (try! (test-store-analysis))
    (try! (test-get-analysis))
    (try! (test-access-permissions))
    (try! (test-store-oracle-verification))
    (try! (test-verify-integrity))
    (try! (test-duplicate-prevention))
    (ok "All tests passed!")
  )
)