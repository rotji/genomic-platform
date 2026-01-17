
> **Note:** This document follows the principles in [system design phylosophy.md](system%20design%20phylosophy.md).

Perfect — we’ll **integrate NFTs directly into your Genomic Platform** as a core feature, not an afterthought.

Here’s how we’ll proceed step by step:

# ✅ 1. Define the NFT Use Cases Inside Your Platform

We’ll add **three core genomic NFT utilities**:

### ✅ A. Personal DNA/RNA Ownership NFTs

Users upload their DNA/RNA → the system encrypts the data → mints an NFT that represents:

* Ownership
* Consent rules
* Access permissions
* Monetization rights

This NFT acts as the user's “genomic passport.”

---

### ✅ B. Licensing & Access-Control NFTs

Researchers, healthcare orgs, AI companies, and universities can **request access** via smart contracts.

Access will be:

* Time-bound
* Purpose-specific
* Pay-per-use or royalty-based

Income goes to the NFT owner (person, lab, or institution).

---

### ✅ C. Data Vault & Identity Integration

Each genome NFT links to encrypted storage (off-chain) such as:

* IPFS
* Filecoin
* Secure cloud vault
* Hospital storage (if required)

Access keys are managed via Clarity smart contracts.

---

# ✅ 2. How NFTs Fit into Your Existing Roadmap

We’ll integrate NFTs into:

### ✅ The Platform’s Core Flow:

1. **DNA/RNA Upload**
2. **Classical Genomic Analysis**
3. **Result Generation**
4. **Optional Mint as NFT** (ownership + access control)
5. **Marketplace/Sharing Permissions**
6. **Royalties + Audit Tracking**

---

### ✅ Sectors that Benefit:

* Individuals (self-owned DNA)
* Clinics and hospitals
* Researchers
* Bioinformatics labs
* Veterinary & agriculture
* Forensics
* Pharma companies
* Health startups

---

# ✅ 3. Smart Contract Layers for Your NFTs

We’ll classify the Clarity contract files into:

### ✅ 🔹 Basic

* `genomic-nft.clar` — mint, transfer, metadata hash

### ✅ 🔹 Medium

* `access-permission.clar` — grant/revoke access, temp tokens
* `royalty-handler.clar` — automatic payments

### ✅ 🔹 Advanced

* `data-vault-oracle.clar` — connects to storage
* `research-licensing.clar` — handles institutional access
* `multi-signature-consent.clar` — patient/family/legal cases

---

# ✅ 4. Business Model Expansion with NFTs

We add **three monetization layers**:

### ✅ 1️⃣ Personal Genomic Wallets

Individuals own and manage their DNA profiles.

### ✅ 2️⃣ Research Licensing Hub

Organizations request access and pay via smart contracts.

### ✅ 3️⃣ Genomic NFT Marketplace

People can opt-in to monetize their anonymized data or contribute to studies.

---

# ✅ 5. Narrative Impact for Pitch/Branding

We can add this to your messaging:

> “Your DNA should belong to you — not corporations.
> Genomic Platform gives individuals power through encrypted genomic NFTs.
> Your data, your consent, your profit.”

---

# ✅ 6. Next Step — Tell Me Your Direction:

Which of these should I deliver first?

1️⃣ **Add NFTs to the Pitch Deck we already wrote**
2️⃣ **Design the NFT system architecture (technical + visual)**
3️⃣ **Start drafting the smart contract files (Clarify structure only)**
4️⃣ **Create the user flow: upload → mint → permission → royalty**

Just say **1, 2, 3, or 4**, and I’ll move immediately.

Perfect — I’ll deliver all three items you asked for **now**:

1. A clear **NFT system architecture** (technical + visualized in text) showing how NFTs fit into the Genomic Platform.
2. A **smart-contract scaffold** (Clarity `.clar` files) — detailed function/state/interface specs (no implementation code), grouped Basic / Medium / Advanced.
3. A step-by-step **user flow** (upload → mint → permission → royalty) with the exact sequence of front-end / back-end / python / oracle / contract interactions, sample payload shapes, and security notes.

---

# 1) NFT System Architecture — Technical + Visual (text diagram)

## Overview (one-sentence)

Genomic NFTs are on-chain tokens that represent ownership, consent rules, and monetization permissions for off-chain encrypted genomic data (files stored in IPFS/s3/secure vault). Smart contracts govern minting, access requests, time-limited access tokens, royalties, and audit trails; an Oracle/service layer mediates decryption access and payment release.

## Main components

* **Frontend (React + stacks.js)** — user wallet, upload UI, mint flow, access request UI, marketplace UI.
* **Backend (Node/Express + TypeScript)** — upload orchestration, presigned URLs, manifest creation, metadata generation, auth, payment coordination, Oracle interface.
* **Python Analysis Services** — classical analysis pipelines, produce result artifacts & hashes.
* **Storage (IPFS / S3 / secure vault)** — encrypted genomic files and results; manifest/metadata pointers.
* **Oracle / Bridge** — trusted server that validates analysis, controls decryption key escrow, and submits proofs to Clarity contracts.
* **Clarity Smart Contracts** — NFT minting, access-permission, royalty handling, audit-log, oracle registration.
* **Marketplace & UI** — list NFTs, request access, show audit & payment history.

## Textual architecture diagram

```
[User Browser + Wallet (stacks.js)] 
        │
        │ 1) Upload / Mint Request
        ▼
[Frontend] ──REST──> [Backend API] ──> (pre-signed URLs) ──> [Storage (IPFS/S3)]
        │                             │
        │                             └─> store encrypted file + manifest
        │
        │ 2) Kick off Analysis (optional) --> [Python Analysis Service]
        │                                      └─> result JSON + resultHash
        │
        │ 3) Backend prepares NFT metadata (manifestCID, resultHash, consentHash)
        │
        │ 4) Frontend uses stacks.js to sign & call --> [Clarity: genomic-nft.clar::mintNft(metadataHash)]
        │
        │ 5) NFT minted (owner = user's principal). On-chain metadata holds pointer (CID/hash) only.
        ▼
[Clarity Contracts]
   ├─ genomic-nft.clar (mint, transfer, metadata)
   ├─ access-permission.clar (request/grant temporary access tokens)
   ├─ royalty-handler.clar (split payments, auto-royalties)
   └─ oracle-bridge.clar (register oracle, submit attestations)
        ▲
        │ 6) When researcher requests access:
        │    - Frontend request -> backend -> pay-per-access -> stacks.js triggers payment -> access-permission contract records payment and issues "access ticket" (on-chain)
        │    - Oracle or backend validates and releases decryption key via secure channel (not on-chain)
        ▼
[Researcher / Buyer] <--- secure, time-limited download link or key to decrypt file
```

## Key design decisions (short)

* **Never store raw genome on-chain.** Only hashes/CIDs and encrypted metadata.
* **NFT = ownership + pointer + consent rules.** The NFT metadata contains manifest CID, consentHash, pipelineHash, and public flags.
* **Access = on-chain signal + off-chain key material.** Contracts record proof and payments; decryption keys are held by Oracle/key-escrow and released after verification.
* **Royalties & marketplace flows are automatic via contracts.** Payments go through payments/royalty contracts and are split per rules.
* **Audit trail**: all major events (mint, access-grant, payment, oracle-attestation) recorded on-chain (hashes only) for compliance.

---

# 2) Smart-Contract Scaffold (Clarity `.clar` files) — SPECIFICATIONS (no code)

> Each contract listing: purpose, state variables (conceptual), core public functions (signatures), events/logs, access control notes and failure conditions.

---

## Basic Phase (core NFT ownership + marketplace hooks)

### `genomic-nft.clar`

**Purpose:** Mint and manage genomic NFTs (ownership & metadata pointer).

**State (conceptual):**

* `nft-metadata-map` : nft-id → metadata-hash/CID (buff or tuple)
* `nft-owner` : nft-id → principal (standard NFT ownership)
* `next-nft-id` : uint

**Primary public functions:**

* `mint-nft (recipient: principal, metadata-hash: (buff N)) -> (response uint bool)`
  *Returns nft-id if success.*
* `transfer-nft (nft-id: uint, to: principal) -> (response bool uint)`
* `get-nft-metadata (nft-id: uint) -> (response (buff N) uint)`
* `burn-nft (nft-id: uint) -> (response bool uint)` — owner/admin only.

**Events / logs (conceptual):**

* `NftMinted(nft-id, owner, metadata-hash, timestamp)`
* `NftTransferred(nft-id, from, to)`
* `NftBurned(nft-id)`

**Access control:**

* `mint-nft` can be called by the owner via signed transaction (user wallet) or by a platform minter role (for lab-assisted mint).
* Use role checks for admin minting.

**Failure modes to guard:** duplicate metadata, overflow nft-id, unauthorized transfer.

---

### `marketplace.clar` (basic)

**Purpose:** Simple listing & purchase hooks referencing NFT ids (off-chain asset delivery handled by backend).

**State (conceptual):**

* `listings` : listing-id → {nft-id, seller, price, active}
* `sales` : sale-id → details

**Primary public functions:**

* `create-listing (nft-id, price) -> response listing-id` (owner only)
* `buy-listing (listing-id) -> response sale-id` (handles transfer/escrow call)
* `cancel-listing (listing-id) -> response bool`

**Events:** `ListingCreated`, `ListingSold`, `ListingCancelled`

**Access control:** validate NFT ownership at list time.

---

## Medium Phase (access, royalties, and oracle bridge)

### `access-permission.clar`

**Purpose:** Manage access requests, approvals, and time-limited access tickets (records only; no keys on-chain).

**State:**

* `access-requests` : request-id → {nft-id, requester, purpose, price, status, expiryBlock}
* `grants` : grant-id → {request-id, grantee, expiryBlock, usageRights}

**Primary public functions:**

* `request-access (nft-id, purpose, offered-price) -> response request-id`
* `grant-access (request-id, expiryInBlocks, usageFlags) -> response grant-id` (owner or authorized oracle can call)
* `revoke-access (grant-id) -> response bool`
* `verify-grant (grant-id, grantee) -> response bool`

**Events:** `AccessRequested`, `AccessGranted`, `AccessRevoked`

**Notes:**

* Payment may be done on-chain via `payments` contract before `grant-access` is executed.
* `grant-access` does NOT reveal keys; it signals the Oracle to release the decryption key via secure off-chain channel.

---

### `royalty-handler.clar`

**Purpose:** Automatically split and route payments (sales/licensing) according to stored royalty rules.

**State:**

* `royalty-rules` : nft-id -> list of {recipient, pct}
* `balances` : principal -> uint (in STX or platform token)

**Functions:**

* `set-royalties (nft-id, recipients[], percents[])` (owner or admin)
* `distribute-payment (sale-id, amount, nft-id) -> response bool` — called during purchase flow; contract sends shares to recipients (or records balances).

**Events:** `RoyaltySet`, `RoyaltyDistributed`

**Notes:** Enforce sum(percent) <= 10000 (basis points). Handle rounding and failure fallback to platform account.

---

### `oracle-bridge.clar`

**Purpose:** Register authorized oracles and accept oracle attestations (result hashes, time-stamped claims). Used to anchor analysis results and trigger payments/permissions.

**State:**

* `authorized-oracles` : principal -> bool
* `oracle-jobs` : job-id -> {submitter, dataHash, resultHash, attestedBy, status, timestamp}

**Functions:**

* `register-oracle (oracle-principal)` (governance/admin)
* `submit-oracle-attestation (job-id, result-hash, metadata-hash)` (callable only by authorized oracle principal)
* `get-job (job-id) -> job info`

**Events:** `OracleRegistered`, `OracleAttested`

**Notes:** Oracle attestations may trigger `royalty-handler.distribute-payment` and `access-permission.grant-access` as part of the workflow.

---

## Advanced Phase (privacy, escrow, multi-signature consent)

### `data-vault-oracle.clar`

**Purpose:** Integrate with secure decryption key escrow. Minimizes trust by requiring multi-oracle or multi-sig approval for high-sensitivity releases.

**State:**

* `decryption-requests` : req-id -> {nft-id, requester, approvals[], threshold, status}

**Functions:**

* `init-decrypt-request (grant-id) -> req-id`
* `approve-decrypt (req-id)` (oracle signers)
* `execute-decrypt (req-id)` (when approvals >= threshold) — records event to coordinate off-chain key release.

**Events:** `DecryptRequestInit`, `DecryptApproved`, `DecryptExecuted`

**Access control & privacy:** This contract only coordinates approval counts and timestamps. Actual keys remain in secure vault (KMS/HSM) and are released securely by the Oracle infrastructure. On-chain records are minimal (hashes + approvals).

---

### `multi-signature-consent.clar`

**Purpose:** Manage cases where consent requires multiple parties (patient + legal guardian + clinician).

**State:**

* `consents` : consent-id -> {nft-id, signers[], signed[]}

**Functions:**

* `create-consent(nft-id, signers[])`
* `sign-consent(consent-id)`
* `is-consent-valid(consent-id) -> bool`

**Events:** `ConsentCreated`, `ConsentSigned`, `ConsentCompleted`

**Notes:** Consent data (actual form) stored off-chain; on-chain only stores consent-hash and signer principals.

---

## Testing & upgrade pointers

* Each contract should have Clarinet unit tests for happy & unhappy paths.
* Use a registry pattern so contracts can be pointed to new implementations by governance (addresses stored in `registry.clar`).
* Keep on-chain state minimal; store hashes and pointers only.

---

# 3) User Flow: Upload → Mint → Permission → Royalty

I’ll break this into **detailed sequential steps**: frontend actions, backend jobs, Python analysis, storage changes, contract calls, Oracle actions. I’ll include **sample payloads** (shapes) for key API / contract calls and security checks.

---

## A — Preliminaries & assumptions

* User has a Stacks-compatible wallet (principal).
* Platform backend has a secure Oracle server with KMS/HSM.
* Storage: encrypted files go to IPFS or S3 with server-side encryption; decryption keys are stored in secure vault and never on-chain.
* All on-chain calls use stacks.js from the frontend or server wallet for authorized actions.

---

## B — Step-by-step flow

### Step 0 — User Registration (one-time)

**Frontend:** User connects wallet (stacks.js) and creates profile.
**On-chain:** optional `user-identity.clar::register-user(walletPrincipal, role)` to link identity.
**Backend:** record user profile, KYC if required.

---

### Step 1 — Upload & Manifest Creation

**Action (frontend):**

* User selects file(s) (FASTA/FASTQ/VCF) or pastes sequence.
* UI shows predicted size → platform selects strategy (small/chunked/multipart).

**Frontend → Backend (API):** `POST /upload/init`
**Sample payload:**

```json
{ "user": "ST...xyz", "fileName": "sample1.fastq.gz", "size": 42000000, "type": "FASTQ", "consent": "consentHashXYZ" }
```

**Backend:**

* Generate `uploadId`, choose storage method, produce pre-signed URLs or chunk policy.
* Return presigned URLs + manifest template.

**Frontend/Client:** Upload file chunks to storage (S3 or IPFS upload service).
**After upload:** Frontend calls `POST /upload/complete` with chunk ETags / final hash.

**Backend verifies:** checksums, constructs `manifest` (list of chunk hashes, final SHA256, metadata), produces `manifestCID` (if IPFS) and `fileHash`.

**Important:** Backend stores encrypted file pointer: `{manifestCID, fileHash, storageKey, encryptionInfo, consentHash}`.

---

### Step 2 — Optional Classical Analysis (Python)

**Backend:** Enqueues analysis job: `enqueueJob({uploadId, manifestCID, pipeline: "mutation-detect@v1.2"})` to job queue (Rabbit/Kafka).
**Worker:** Python container mounts or streams file, runs pipeline, writes results (VCF/JSON) to storage, computes `resultHash`.

**Result artifact:** `{resultCID, resultHash, summaryJSON}`

**Backend:** Stores result metadata and links it to `uploadId`.

---

### Step 3 — Prepare NFT Metadata

**Backend:** Create NFT metadata JSON (to be pinned to IPFS):

```json
{
  "title": "Genomic NFT — sample1",
  "description": "Encrypted genome owned by ST...xyz; consentRef:consentHashXYZ",
  "manifestCID": "Qm...abc",
  "fileHash": "0x....",
  "pipelineVersion": "mutation-detect@v1.2",
  "resultHash": "0x....",
  "createdAt": "2025-10-01T12:00:00Z",
  "publicFlags": { "anonymized": true, "forResearch": false }
}
```

**Backend pins to IPFS** → obtains `metadataCID`.

---

### Step 4 — Mint NFT (on-chain)

**Frontend (via stacks.js):** calls `genomic-nft.clar::mint-nft(recipient=walletPrincipal, metadataHash=metadataCID)`.
**On success:** transaction receipts show `NftMinted(nft-id, owner, metadataCID, ts)`.

**Backend:** records `nftId`, links `uploadId` → `nftId`.

**UX:** Show mint confirmation, link to explorer for on-chain proof.

---

### Step 5 — List in Marketplace (optional)

**Frontend:** Owner clicks “List for licensing” → chooses price & terms (time-limited access, allowed use).
**Frontend** calls `marketplace.create-listing(nftId, price)` via stacks.js.
**On-chain event:** `ListingCreated(listingId, nftId, seller, price)`.

---

### Step 6 — Researcher Requests Access / Purchase

**Researcher (frontend):** browses listing → clicks “Request Access”.
**Frontend→Backend:** `POST /access/request {nftId, requesterPrincipal, purpose, offeredPrice}`.

**Backend:** creates access request record and may call `access-permission.clar::request-access(nftId, purpose, offeredPrice)` **or** buyer initiates payment on-chain: `payments.pay-for-job(jobId, amount)`.

**On-chain:** payment recorded; `marketplace.buy-listing(listingId)` triggers `royalty-handler.distribute-payment(saleId, amount)`.

---

### Step 7 — Grant & Oracle-mediated Key Release

**If owner auto-accepts or platform policy auto-grants:**

* `access-permission.clar::grant-access(requestId, expiryInBlocks, usageFlags)` is invoked by owner (or off-chain operator via signed tx).
* On-chain `AccessGranted` event emitted.

**Oracle waveform:**

* Oracle (backend with secure keys) sees `AccessGranted` event OR contract call triggers a webhook to Oracle.
* Oracle validates payment and grant, then performs secure release:

  * Retrieve encrypted symmetric key (KMS/secure vault) for `manifestCID`.
  * Wraps the symmetric key to requester’s public key or generates a one-time download token.
  * Delivers the wrapped key to requester via secure channel (backend -> requester responds via authenticated API).
  * Optionally, Oracle records an attestation on-chain: `oracle-bridge.clar::submit-oracle-attestation(jobId, resultHash, metadataHash)`.

**Important:** The decryption key never goes on-chain; the oracle releases it off-chain after verifying on-chain conditions.

---

### Step 8 — Access, USE, & Audit

**Researcher:** uses decrypted file for allowed purpose (analysis).
**Platform:** logs usage off-chain and pins audit hash on-chain: `audit-log.clar::log-event(hashOfUsageReport, eventType)`.
**If royalties apply:** `royalty-handler` already distributed payment at purchase; for pay-per-use the backend triggers `royalty-handler.distribute-payment` after usage attested.

---

### Step 9 — Revoke / Expiry

* Grants created with expiryBlock cause oracle to refuse decryption after expiry.
* Owner can call `access-permission.clar::revoke-access(grantId)` which emits event; oracle invalidates tokens.
* On revocation, backend logs event and optionally creates on-chain tombstone.

---

## C — Sample payloads & on-chain call examples (shape only)

**NFT mint (metadataCID)**

* On-chain param: `metadataHash = "Qm...abc"` (buff)
* Return: `nftId: 871`

**Access request** (off-chain record)

```json
{
  "requestId": "REQ-20251001-0001",
  "nftId": 871,
  "requester": "ST2...abc",
  "purpose": "clinical-research",
  "offeredPrice": 1000000, // in micro-STX or token units
  "status": "pending"
}
```

**Grant record (on-chain)**

* `grantId = 54`, `expiryBlock = 100000`, `usageFlags = {"allowDownload":true, "readOnly":true}`

**Oracle attestation payload (off-chain)**

```json
{
  "jobId": "JOB-20251001-001",
  "nftId": 871,
  "resultHash": "0xabc123",
  "attestedBy": "oracle1.stx",
  "timestamp": 1730398600,
  "signature": "sig..."
}
```

---

## D — Security and privacy safeguards (must haves)

* **KMS/HSM** for decryption keys; keys never in plain on backend.
* **Short-lived tokens** for downloads; signed & bound to requester principal + grant id.
* **Consent-first**: store consent forms off-chain; put consentHash on-chain.
* **Audit trail**: every mint, grant, release, and revoke writes a hash to `audit-log.clar`.
* **Multi-oracle or multi-sign approval** for high-risk clinical data release.
* **GDPR-ready**: support subject erasure by deleting off-chain data and storing a tombstone hash on-chain (no raw data left).
* **Rate limits and anomaly detection** to prevent mass exfiltration.

---

# Extra: Example Monetization / Royalty Patterns

* **Primary sale:** NFT mint fee paid to platform/owner split; `royalty-handler` allocates percentages.
* **Secondary licensing:** each downstream access triggers `royalty-handler` distribution per stored royalty rules.
* **Subscription tiers:** organizations purchase API subscriptions; NFT owners may give discounted access to subscribers.
* **Data pools / DAOs:** participants can pool NFTs for research and share rewards via DAO contract.

---

## Deliverables summary (what you now have)

* A clear **system architecture** for genomic NFTs in the platform.
* A **detailed Clarity contract scaffold** (files, state, functions, events, access notes) ready for Clarinet tests and implementation.
* A full **upload→mint→permission→royalty user flow**, including exact interactions, payload shapes, oracle gating, and security considerations.

---

Would you like me to:

* (A) Draft the **actual Clarity function signatures** in .clar stub form (still no implementation)?
* (B) Produce a **sequence diagram graphic** (SVG/PNG) of the user flow?
* (C) Draft the **backend API specifications** (OpenAPI-style) for the flows we described?

Say **A**, **B**, or **C** (or any combo) and I’ll proceed.

Great — I completed **A (Clarity .clar stubs)**, **B (sequence diagram image)**, and **C (OpenAPI-style backend spec)**. You can use the Clarity stubs as contract skeletons to hand to a Clarity developer, use the image to explain the flow, and plug the OpenAPI spec into your backend planning.

---

## B — Sequence diagram image (download)

I generated a visual sequence flow diagram showing the **Upload → Mint → Access → Royalty** flow (frontend, backend, storage, python analysis, Oracle, Clarity contracts, marketplace, buyer).

[Download the sequence flow image (PNG)](sandbox:/mnt/data/genomic_nft_sequence_flow.png)

---

## A — Clarity contract stubs (.clar) — signatures + minimal bodies

> Each file below is a skeleton you can drop into a Clarinet project and expand. They purposely keep on-chain state minimal (hashes / pointers only) and provide the public entry points we specified. These are **stubs** — no business logic beyond safe, minimal returns — purpose is to define interfaces, events, and expected inputs/outputs.

### 1) `genomic-nft.clar`

```clarity
;; genomic-nft.clar
;; NFT stub for genomic metadata ownership (metadata = CID or SHA-256)

(define-data-var next-nft-id uint u1)
(define-map nft-metadata ((nft-id uint)) ((metadata (buff 256)) (creator principal)))
(define-map nft-owner ((nft-id uint)) ((owner principal)))

;; Mint a new genomic NFT. metadata-buff = CID or hash bytes (stored off-chain).
(define-public (mint-nft (recipient principal) (metadata-buff (buff 256)))
  (let ((nid (var-get next-nft-id)))
    (begin
      (map-insert nft-metadata {nft-id: nid} {metadata: metadata-buff, creator: tx-sender})
      (map-insert nft-owner {nft-id: nid} {owner: recipient})
      (var-set next-nft-id (+ nid u1))
      (ok nid))))
      
;; Transfer NFT (owner only)
(define-public (transfer-nft (nft-id uint) (to principal))
  (let ((entry (map-get? nft-owner {nft-id: nft-id})))
    (match entry
      entry-val
      (let ((current (get owner entry-val)))
        (if (is-eq current tx-sender)
            (begin (map-insert nft-owner {nft-id: nft-id} {owner: to}) (ok true))
            (err u100)))
      (err u101))))

;; Read metadata
(define-public (get-metadata (nft-id uint))
  (match (map-get? nft-metadata {nft-id: nft-id})
    metadata (ok (get metadata metadata))
    (err u102)))
```

---

### 2) `access-permission.clar`

```clarity
;; access-permission.clar
;; Records access requests and grants (on-chain signals only)

(define-data-var next-request-id uint u1)
(define-map access-requests ((request-id uint))
  ((nft-id uint) (requester principal) (purpose (buff 128)) (price uint) (status (buff 32)) (expiry-block uint)))
(define-map grants ((grant-id uint))
  ((request-id uint) (grantee principal) (expiry-block uint) (usage-flags (buff 128))))

(define-public (request-access (nft-id uint) (purpose (buff 128)) (offered-price uint))
  (let ((rid (var-get next-request-id)))
    (begin
      (map-insert access-requests {request-id: rid}
                  {nft-id: nft-id, requester: tx-sender, purpose: purpose, price: offered-price, status: "pending", expiry-block: u0})
      (var-set next-request-id (+ rid u1))
      (ok rid))))

(define-public (grant-access (request-id uint) (grantee principal) (expiry-block uint) (usage-flags (buff 128)))
  ;; Caller must be owner or authorized minter in a real implementation.
  (let ((gid (var-get next-request-id)))
    (begin
      (map-insert grants {grant-id: gid} {request-id: request-id, grantee: grantee, expiry-block: expiry-block, usage-flags: usage-flags})
      ;; store a quick mapping status on request (not fully implemented)
      (map-insert access-requests {request-id: request-id}
                  (merge (unwrap-panic (map-get? access-requests {request-id: request-id}))
                         {status: "granted"}))
      (var-set next-request-id (+ gid u1))
      (ok gid))))

(define-public (revoke-access (grant-id uint))
  (begin
    (map-delete grants {grant-id: grant-id})
    (ok true)))
```

---

### 3) `royalty-handler.clar`

```clarity
;; royalty-handler.clar
;; Simple royalty record and distribution stub (no actual token transfers here)

(define-map royalty-rules ((nft-id uint)) ((recipients (list 5 principal)) (percents (list 5 uint))))
(define-map balances ((account principal)) ((amount uint)))

(define-public (set-royalties (nft-id uint) (recips (list 5 principal)) (pcts (list 5 uint)))
  ;; Admin/owner check omitted in stub
  (begin
    (map-insert royalty-rules {nft-id: nft-id} {recipients: recips, percents: pcts})
    (ok true)))

;; Called during purchase to distribute (conceptual)
(define-public (distribute-payment (nft-id uint) (amount uint))
  ;; In a real implementation: iterate recipients and send STX/payments.
  (ok true))
```

---

### 4) `oracle-bridge.clar`

```clarity
;; oracle-bridge.clar
;; Register oracles and accept attestations

(define-map authorized-oracles ((oracle principal)) ((allowed bool)))
(define-map oracle-jobs ((job-id uint)) ((submitter principal) (data-hash (buff 64)) (result-hash (buff 64)) (status (buff 32))))

(define-public (register-oracle (oracle principal))
  ;; governance/admin only in real implementation
  (begin
    (map-insert authorized-oracles {oracle: oracle} {allowed: true})
    (ok true)))

(define-public (submit-attestation (job-id uint) (data-hash (buff 64)) (result-hash (buff 64)))
  (if (is-eq (get tx-sender) tx-sender) ;; placeholder check
      (begin
        (map-insert oracle-jobs {job-id: job-id} {submitter: tx-sender, data-hash: data-hash, result-hash: result-hash, status: "attested"})
        (ok true))
      (err u200)))
```

---

### 5) `data-vault-oracle.clar` (advanced)

```clarity
;; data-vault-oracle.clar
;; Coordinates approval counts for decrypt requests (keys released off-chain)

(define-data-var next-decrypt-req uint u1)
(define-map decrypt-requests ((req-id uint)) ((nft-id uint) (requester principal) (approvals (list 10 principal)) (threshold uint) (status (buff 32))))

(define-public (init-decrypt-request (nft-id uint) (requester principal) (threshold uint))
  (let ((rid (var-get next-decrypt-req)))
    (begin
      (map-insert decrypt-requests {req-id: rid} {nft-id: nft-id, requester: requester, approvals: (list), threshold: threshold, status: "pending"})
      (var-set next-decrypt-req (+ rid u1))
      (ok rid))))

(define-public (approve-decrypt (req-id uint))
  ;; Each oracle signer calls this to add their approval. Off-chain oracle validates and then release occurs when approvals >= threshold.
  (ok true))
```

---

### 6) `multi-signature-consent.clar` (advanced)

```clarity
;; multi-signature-consent.clar
;; Consent coordination for multi-party signoff

(define-data-var next-consent-id uint u1)
(define-map consents ((consent-id uint)) ((nft-id uint) (signers (list 5 principal)) (signed (list 5 principal))))

(define-public (create-consent (nft-id uint) (signers (list 5 principal)))
  (let ((cid (var-get next-consent-id)))
    (begin
      (map-insert consents {consent-id: cid} {nft-id: nft-id, signers: signers, signed: (list)})
      (var-set next-consent-id (+ cid u1))
      (ok cid))))

(define-public (sign-consent (consent-id uint))
  ;; Adds tx-sender to signed list if in signers
  (ok true))
```

---

### 7) `marketplace.clar` (basic)

```clarity
;; marketplace.clar - lightweight listing/purchase pointers (actual delivery off-chain)

(define-data-var next-listing-id uint u1)
(define-map listings ((listing-id uint)) ((nft-id uint) (seller principal) (price uint) (active bool)))

(define-public (create-listing (nft-id uint) (price uint))
  (let ((lid (var-get next-listing-id)))
    (begin
      (map-insert listings {listing-id: lid} {nft-id: nft-id, seller: tx-sender, price: price, active: true})
      (var-set next-listing-id (+ lid u1))
      (ok lid))))

(define-public (buy-listing (listing-id uint))
  ;; Buyer pays; contract would route funds or notify backend to facilitate transfer.
  (ok true))
```

---

### 8) `audit-log.clar`

```clarity
;; audit-log.clar - append-only event hashes for off-chain audit records

(define-data-var next-audit-id uint u1)
(define-map audit-events ((audit-id uint)) ((actor principal) (event-hash (buff 64)) (event-type (buff 64)) (timestamp uint)))

(define-public (log-event (event-hash (buff 64)) (event-type (buff 64)))
  (let ((aid (var-get next-audit-id)))
    (begin
      (map-insert audit-events {audit-id: aid} {actor: tx-sender, event-hash: event-hash, event-type: event-type, timestamp: block-height})
      (var-set next-audit-id (+ aid u1))
      (ok aid))))
```

---

> These stubs are intentionally lightweight and safe — they define the **interface** and the minimum on-chain state to record ownership, requests, grants, royalties, and audit hashes. Implementation details (access checks, payments, token transfers, multi-sig, oracle verification, error handling) belong in the real contract code and security audit.

---

## C — OpenAPI-style Backend API specification (YAML)

Below is an **OpenAPI 3.0**-style spec sketch (concise) for the main endpoints used in the NFT flow. You can put this into an OpenAPI editor / Postman and expand.

```yaml
openapi: 3.0.1
info:
  title: Genomic Platform API (NFT Flow)
  version: "1.0.0"
servers:
  - url: https://api.genomic-platform.example
paths:
  /upload/init:
    post:
      summary: Initialize upload and receive presigned URLs
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                userPrincipal:
                  type: string
                fileName:
                  type: string
                size:
                  type: integer
                type:
                  type: string
                consentHash:
                  type: string
      responses:
        '200':
          description: Upload initiated
          content:
            application/json:
              schema:
                type: object
                properties:
                  uploadId: { type: string }
                  strategy: { type: string }
                  presignedUrls:
                    type: array
                    items: { type: string }
  /upload/complete:
    post:
      summary: Finalize upload and register manifest
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                uploadId: { type: string }
                chunkETags: 
                  type: array
                  items: { type: string }
                finalHash: { type: string }
      responses:
        '200':
          description: Upload verified and manifest created
          content:
            application/json:
              schema:
                type: object
                properties:
                  manifestCID: { type: string }
                  fileHash: { type: string }
  /analysis/submit:
    post:
      summary: Submit analysis job on uploaded file
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                uploadId: { type: string }
                pipeline: { type: string }
      responses:
        '200':
          description: Job accepted
          content:
            application/json:
              schema:
                type: object
                properties:
                  jobId: { type: string }
                  etaSeconds: { type: integer }
  /nft/mint:
    post:
      summary: Mint a genomic NFT (frontend uses stacks.js too)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                walletPrincipal: { type: string }
                metadataCID: { type: string }
      responses:
        '200':
          description: Mint request recorded
          content:
            application/json:
              schema:
                type: object
                properties:
                  nftId: { type: integer }
                  txId: { type: string }
  /marketplace/list:
    post:
      summary: Create marketplace listing for an NFT
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                nftId: { type: integer }
                price: { type: integer }
                terms: { type: string }
      responses:
        '200':
          description: Listing created
  /access/request:
    post:
      summary: Request access to an NFT dataset
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                nftId: { type: integer }
                requester: { type: string }
                purpose: { type: string }
                offeredPrice: { type: integer }
      responses:
        '200':
          description: Request logged
          content:
            application/json:
              schema:
                type: object
                properties:
                  requestId: { type: string }
  /access/grant:
    post:
      summary: Owner or authorized party grants access (triggers oracle)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                requestId: { type: string }
                grantee: { type: string }
                expirySeconds: { type: integer }
                usageFlags: { type: string }
      responses:
        '200':
          description: Grant recorded
  /oracle/attest:
    post:
      summary: Oracle posts attestation about job/result (secure endpoint)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                jobId: { type: string }
                resultHash: { type: string }
                metadataCID: { type: string }
                oracleSignature: { type: string }
      responses:
        '200':
          description: Attestation recorded
components:
  schemas:
    NFTMetadata:
      type: object
      properties:
        title: { type: string }
        description: { type: string }
        manifestCID: { type: string }
        fileHash: { type: string }
        pipelineVersion: { type: string }
        resultHash: { type: string }
```

---

## Final notes & next steps

* I provided Clarity stubs (A) that define the *interface* and essential on-chain operations your devs will implement and secure.
* I created a clear **sequence diagram** (B) you can use in investor slides or technical docs. Download it above.
* The **OpenAPI spec** (C) can be dropped into your API repo and expanded into full endpoints, request validation, and automated tests.

If you want I can now:

* Convert each `.clar` stub into separate files and provide downloadable `.clar` files.
* Produce a full sample OpenAPI JSON or YAML file you can import.
* Generate a slide-ready PNG of the diagram with annotations optimized for a pitch deck.
* Produce example frontend stacks.js calls that match the API + contract functions (safe examples).

Which of those would you like next?
