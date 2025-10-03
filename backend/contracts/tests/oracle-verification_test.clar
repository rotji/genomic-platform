;; 🧪 Test suite for oracle-verification contract

;; Test adding authorized oracle
(define-public (test-add-oracle)
  (let ((result (contract-call? .oracle-verification add-oracle 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5)))
    (asserts! (is-ok result) (err "Failed to add oracle"))
    (ok true)
  )
)

;; Test oracle authorization check
(define-public (test-oracle-info)
  (let ((oracle-info (contract-call? .oracle-verification get-oracle-info 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5)))
    (asserts! (is-some oracle-info) (err "Oracle info not found"))
    (let ((info (unwrap! oracle-info (err "Invalid oracle info"))))
      (asserts! (get active info) (err "Oracle should be active"))
      (asserts! (is-eq (get reputation-score info) u100) (err "Wrong initial reputation"))
      (ok true)
    )
  )
)

;; Test gene verification submission (this would fail without proper oracle authorization)
(define-public (test-gene-verification-unauthorized)
  (let ((result (contract-call? .oracle-verification submit-gene-verification
                  "BRCA1"
                  true
                  (some "672")
                  u95
                  (list "ncbi" "clinvar"))))
    ;; This should fail since tx-sender is not an authorized oracle
    (asserts! (is-err result) (err "Should fail for unauthorized oracle"))
    (ok true)
  )
)

;; Test contract stats
(define-public (test-contract-stats)
  (let ((stats (contract-call? .oracle-verification get-contract-stats)))
    (asserts! (>= (get oracle-count stats) u1) (err "Should have at least 1 oracle"))
    (asserts! (is-eq (get min-consensus stats) u75) (err "Wrong consensus threshold"))
    (ok true)
  )
)

;; Test consensus result retrieval (placeholder)
(define-public (test-consensus-retrieval)
  (let ((consensus (contract-call? .oracle-verification get-consensus "gene" "BRCA1")))
    ;; This might be none if no consensus has been reached yet
    (ok true)
  )
)

;; Run all tests
(define-public (run-all-oracle-tests)
  (begin
    (try! (test-add-oracle))
    (try! (test-oracle-info))
    (try! (test-gene-verification-unauthorized))
    (try! (test-contract-stats))
    (try! (test-consensus-retrieval))
    (ok "All oracle tests passed!")
  )
)