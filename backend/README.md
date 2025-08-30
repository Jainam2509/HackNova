# Green H2 Subsidy – Backend (Express + Mongo + Ethers)

This is a hackathon-ready backend for automating subsidy disbursement using on-chain checks + oracle proofs.

## Quick Start

```bash
cp .env.example .env
# edit .env as needed
npm install
npm run dev
```

### Seed an admin
```
POST /api/admin/seed-admin
```

### Auth
- `POST /api/auth/register` – `{ name, email, password, role? }`
- `POST /api/auth/login` – `{ email, password }`

Copy `token` and use as `Authorization: Bearer <token>`.

### Projects
- `POST /api/projects` – `{ name, description, baselineCapacityKgPerDay }`
- `GET /api/projects`

### Milestones
- `POST /api/milestones` – `{ project, name, targetValue, unit, dueDate, subsidyAmount }`
- `GET /api/milestones/:projectId` – list

### Oracle Webhook (simulated)
- `POST /api/oracle/callback`
  - Headers: `x-oracle-signature: <hmac_sha256(json_body, ORACLE_WEBHOOK_SECRET)>`
  - Body: `{ milestoneId, measuredValue, unit, source, observedAt }`

If `measuredValue >= targetValue`, the milestone is marked achieved (off-chain).

### On-chain Attestation
The backend calls the contract read method `isMilestoneEligible(projectId, milestoneId)` to validate.
For local testing, deploy `contracts/SubsidyManager.sol` and set eligibility with the **string** IDs (MongoDB string IDs).

### Trigger Disbursement
- `POST /api/disbursements/:projectId/:milestoneId/trigger`
  - Requires: milestone achieved off-chain + on-chain eligible
  - Payout is mocked (records `paid` with a UUID).

### Audit
- `GET /api/audit` (admin only) – shows last 200 audit entries.

## Notes
- This is a secure-by-default scaffold (helmet, cors, JWT, hashed passwords).
- Replace `paymentService` with a real bank/government integration later.
- Oracle webhook is HMAC-signed to prevent spoofing.
