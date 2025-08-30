# Green H2 Subsidy - Frontend (Vite + React + Tailwind)

## Setup

1. Copy example environment:
   ```
   cp .env.example .env
   ```
2. Install:
   ```
   npm install
   npm run dev
   ```

## Environment
Set `VITE_API_BASE` to your backend API root, e.g. `http://localhost:4000/api`

The frontend provides:
- Login / Register
- Dashboard (list projects)
- Create project / create milestone
- Trigger disbursement button (calls backend)
- Audit log viewer (admin only - uses token role)

This is a minimal hackathon scaffold. Integrate more UI/validation and improve security/UX as needed.
