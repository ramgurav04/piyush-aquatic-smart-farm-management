# Piyush Aquatic frontend

React, TypeScript, Vite, Tailwind CSS 4 and React Router frontend for the Piyush Aquatic ornamental fish farm demo. All records and account data are browser-local mock data; there is no connected backend, real inventory, payment, or order submission.

## Run locally

```powershell
cd frontend
npm ci
npm run dev
```

Run `npm run build` for TypeScript and production-build checks, and `npm run lint` for Oxlint.

## Deploy to Vercel

1. Push this branch to GitHub and import the repository in Vercel.
2. Set **Root Directory** to `frontend` (the Vite app is in this subfolder).
3. Keep the framework preset as **Vite**. Use `npm ci` for install, `npm run build` for build, and `dist` for output.
4. Deploy. `vercel.json` includes the SPA rewrite so direct URLs such as `/catalog` and `/customer/orders` work after refresh.

No environment variables are required for the frontend demo. Its demo credentials are public in the client bundle, and browser-local accounts, carts, and enquiries are not shared across devices or users. Deploy this only as a demonstration; it has no secure authentication or backend.

## Demo sign-ins

| Account | Entry point | Email | Password |
|---|---|---|---|
| Individual customer | `/login` | `individual@piyushaquatic.com` | `CustomerDemo123!` |
| Business customer | `/login` | `business@piyushaquatic.com` | `CustomerDemo123!` |
| Administrator | `/management/admin/login` | `admin@piyushaquatic.com` | `AdminDemo123!` |
| Farm staff | `/management/staff/login` | `staff@piyushaquatic.com` | `StaffDemo123!` |

At `/login`, choose Individual or Business. That choice must match the customer account; it does not set or grant a role. Public registration creates customer accounts only. Internal accounts use the separate `/management/login` chooser and role-specific sign-in pages. The demo credentials and all role checks are client-side and are not secure authentication; production authorization must be enforced by the Spring Boot API.

## Frontend structure

- `src/context/AuthContext.tsx`: mock customer registration, demo sign-in and browser session restoration.
- `src/context/CommerceContext.tsx`: browser-local demo enquiry cart and history.
- `src/mocks/fish.ts`: typed sample fish catalog; availability and price are enquiry-only labels.
- `src/pages` and `src/layouts`: public landing/catalog, customer portal, administrator workspace and restricted staff workspace.
- `src/routes`: role-protected customer, administrator and staff routes.

Customer credentials created through registration are stored as salted browser-side SHA-256 digests, not plaintext passwords. This is a demonstration convenience, not a production password storage strategy. Browser-local data can be modified or cleared by the user.

## Spring Boot integration

Replace the context and mock data access with API services for registration, authentication, customer profiles, catalog availability, and orders. Keep the public signup contract restricted to customer account types; the server must assign and enforce `CUSTOMER`, `ADMIN`, and `STAFF` permissions. Implement password recovery, secure session/token handling, order confirmation, real availability and pricing, and server-side validation before production use.
