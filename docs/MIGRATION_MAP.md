# Migration Map & Baseline Audit

## Baseline Execution Status
Executed on `main` branch before refactoring:
- `npm run build` in `frontend/`: **Passed** (`tsc -b && vite build` built successfully in ~10.5s).
- `npm run lint` in `frontend/`: **Passed** (Oxlint reported 0 errors, 0 warnings across 58 files).
- Test runner: None configured in `package.json`.
- State storage: Mock data in `src/mocks/` backed by browser `localStorage`.
- Roles: `CUSTOMER`, `ADMIN`, `STAFF`.

---

## (a) Full Current Route Inventory

| Route Path | Component / Element | Route Guard | Permitted Roles / Audience | Purpose & Behavior |
|---|---|---|---|---|
| `/` | `Landing` | None (Public) | All (Public / Guests) | Public storefront landing page |
| `/login` | `Login` | None (Public) | Guests / Customer | Customer account type selector (Individual or Business) |
| `/login/individual` | `Login (customerType="INDIVIDUAL")` | None (Public) | Guests / Retail Customer | Login specifically for individual customer |
| `/login/business` | `Login (customerType="BUSINESS")` | None (Public) | Guests / Wholesale Customer | Login specifically for business customer |
| `/management/login` | `ManagementLoginPicker` | None (Public) | Internal Staff / Admin | Role selection portal for farm management |
| `/management/admin/login` | `Login (managementRole="ADMIN")` | None (Public) | Administrators | Internal login for farm administrators |
| `/management/staff/login` | `Login (managementRole="STAFF")` | None (Public) | Farm Staff | Internal login for farm staff members |
| `/signup` | `Signup` | None (Public) | Guests | Customer registration portal |
| `/password-recovery` | `PasswordRecovery` | None (Public) | Guests | Password reset mockup |
| `/catalog` | `Catalog` | None (Public) | All | Fish species catalog and search |
| `/customer` | `CustomerLayout` > `CustomerDashboard` | `ProtectedRoute` | `CUSTOMER` | Customer overview dashboard |
| `/customer/cart` | `CustomerLayout` > `Cart` | `ProtectedRoute` | `CUSTOMER` | Customer enquiry cart |
| `/customer/orders` | `CustomerLayout` > `CustomerOrders` | `ProtectedRoute` | `CUSTOMER` | Customer orders/enquiry history |
| `/customer/profile` | `CustomerLayout` > `CustomerProfile` | `ProtectedRoute` | `CUSTOMER` | Customer profile management |
| `/admin` | `AdminLayout` > `Dashboard` | `ProtectedRoute` | `ADMIN` | Farm admin overview dashboard |
| `/admin/species` | `AdminLayout` > `ManagementModule (species)` | `ProtectedRoute` | `ADMIN` | Species management & breeding |
| `/admin/tanks` | `AdminLayout` > `ManagementModule (tanks)` | `ProtectedRoute` | `ADMIN` | Tanks management |
| `/admin/inventory` | `AdminLayout` > `ManagementModule (inventory)` | `ProtectedRoute` | `ADMIN` | Farm stock inventory records |
| `/admin/customers` | `AdminLayout` > `ManagementModule (customers)` | `ProtectedRoute` | `ADMIN` | Customer relationship management |
| `/admin/orders` | `AdminLayout` > `ManagementModule (orders)` | `ProtectedRoute` | `ADMIN` | Order & enquiry management |
| `/admin/staff` | `AdminLayout` > `ManagementModule (staff)` | `ProtectedRoute` | `ADMIN` | Staff directory management |
| `/admin/reports` | `AdminLayout` > `ManagementModule (reports)` | `ProtectedRoute` | `ADMIN` | Farm analytics and reporting |
| `/staff` | `StaffLayout` > `ManagementModule (tasks)` | `ProtectedRoute` | `STAFF` | Daily assigned farm tasks |
| `/staff/water` | `StaffLayout` > `ManagementModule (water)` | `ProtectedRoute` | `STAFF` | Water quality monitoring log |
| `/staff/feeding` | `StaffLayout` > `ManagementModule (feeding)` | `ProtectedRoute` | `STAFF` | Feeding schedule and logs |
| `/staff/mortality` | `StaffLayout` > `ManagementModule (mortality)` | `ProtectedRoute` | `STAFF` | Fish mortality log |
| `/staff/inventory` | `StaffLayout` > `ManagementModule (inventory)` | `ProtectedRoute` | `STAFF` | Operational inventory view |
| `*` | `RoleRedirect` | Session-aware | All | Redirects authenticated users to role home, otherwise `/` |

---

## (b) File Migration Mapping

| Current File Location | Target Architectural Location | Responsibility |
|---|---|---|
| `src/main.tsx` | `src/app/main.tsx` | App entry point and DOM root mount |
| `src/App.tsx` | `src/app/App.tsx` | App root with providers |
| `src/lib/queryClient.ts` | `src/app/providers/queryClient.ts` | TanStack Query client configuration |
| `src/routes/AppRoutes.tsx` | `src/app/router/index.tsx` + route groups | Modular route composition |
| `src/routes/ProtectedRoute.tsx` | `src/app/router/ProtectedRoute.tsx` | Role-based route guard |
| *(New)* | `src/app/router/paths.ts` | Canonical route constants |
| *(New)* | `src/app/router/legacyRedirects.tsx` | Backward compatibility redirects |
| *(New)* | `src/app/router/public.routes.tsx` | Public routes definitions |
| *(New)* | `src/app/router/customer.routes.tsx` | Customer portal routes |
| *(New)* | `src/app/router/admin.routes.tsx` | Admin management routes |
| *(New)* | `src/app/router/staff.routes.tsx` | Staff management routes |
| `src/types/user.ts` | `src/domain/users/user.ts` | Pure user domain types |
| *(New)* | `src/domain/users/permissions.ts` | Role to navigation & action permissions |
| `src/types/fish.ts` | `src/domain/fish/species.ts` & `src/domain/fish/batch.ts` | Pure fish species and batch types |
| *(New)* | `src/domain/inventory/stock-record.ts` | Stock records pure types |
| *(New)* | `src/domain/inventory/rules.ts` | Inventory business rules (`sellableQuantity`) |
| *(New)* | `src/domain/catalog/product-listing.ts` | Catalog listings and sellable quantity calculation |
| `src/types/order.ts` | `src/domain/orders/order.ts` | Order domain types |
| *(New)* | `src/domain/orders/rules.ts` | Order status transitions business rules |
| `src/mocks/demoAccounts.ts` | `src/data/seed/demoAccounts.ts` | Demo accounts fixtures |
| `src/mocks/fish.ts` | `src/data/seed/fish.ts` & `src/data/seed/stock.ts` | Split into catalog listings & farm stock |
| `src/mocks/orders.ts` | `src/data/seed/orders.ts` | Demo seed orders |
| *(New)* | `src/services/storage.ts` | Versioned localStorage manager with auto-reset |
| *(New)* | `src/services/apiConfig.ts` | Base API config placeholder |
| *(New)* | `src/services/contracts/*.ts` | Service interface contracts |
| *(New)* | `src/services/mock/*.ts` | Mock implementations |
| *(New)* | `src/services/index.ts` | Unified service export boundary |
| `src/context/AuthContext.tsx` | `src/modules/authentication/context/AuthContext.tsx` | Auth state management |
| `src/hooks/useAuth.ts` | `src/modules/authentication/hooks/useAuth.ts` | Auth custom hook |
| `src/pages/Login.tsx` | `src/modules/authentication/pages/Login.tsx` | Sign-in page |
| `src/pages/Signup.tsx` | `src/modules/authentication/pages/Signup.tsx` | Registration page |
| `src/pages/PasswordRecovery.tsx` | `src/modules/authentication/pages/PasswordRecovery.tsx` | Password recovery page |
| `src/pages/ManagementLoginPicker.tsx` | `src/modules/authentication/pages/ManagementLoginPicker.tsx` | Staff/Admin login picker |
| `src/pages/Landing.tsx` | `src/modules/ecommerce/pages/Landing.tsx` | Public landing page |
| `src/pages/Catalog.tsx` | `src/modules/ecommerce/pages/Catalog.tsx` | Product catalog page |
| *(New)* | `src/modules/ecommerce/pages/ProductDetails.tsx` | Dedicated product details page |
| `src/pages/Cart.tsx` | `src/modules/ecommerce/pages/Cart.tsx` | Cart & enquiry page |
| `src/pages/CustomerDashboard.tsx` | `src/modules/ecommerce/pages/CustomerDashboard.tsx` | Customer dashboard |
| `src/pages/CustomerOrders.tsx` | `src/modules/ecommerce/pages/CustomerOrders.tsx` | Customer order history |
| `src/pages/CustomerProfile.tsx` | `src/modules/ecommerce/pages/CustomerProfile.tsx` | Customer profile page |
| `src/components/FishCard.tsx` | `src/modules/ecommerce/components/FishCard.tsx` | Storefront fish card |
| `src/context/CommerceContext.tsx` | `src/modules/ecommerce/context/CommerceContext.tsx` | Customer cart-scoped state |
| `src/pages/Dashboard.tsx` | `src/modules/farm-management/pages/Dashboard.tsx` | Farm overview dashboard |
| `src/pages/ManagementModule.tsx` | Decomposed into dedicated pages under `src/modules/farm-management/pages/` | `SpeciesPage`, `BreedingPage`, `TanksPage`, `WaterQualityPage`, `FeedingPage`, `MortalityPage`, `InventoryPage`, `TasksPage`, `StaffPage`, `CustomersPage`, `OrdersPage`, `ReportsPage` |
| `src/components/ui/*` & `src/components/common/*` | `src/shared/ui/*` | Reusable atomic UI components (`Button`, `Input`, `Select`, `Card`, `Badge`, `Table`, `Modal`, `EmptyState`, `Spinner`) |
| `src/layouts/*` | `src/shared/layouts/*` | Unified layouts (`PublicLayout`, `CustomerLayout`, `AdminLayout`, `StaffLayout`) |
| `src/features/*` | Cleaned up / removed | Dead, unreferenced partial prototypes |

---

## (c) Known Duplicated Responsibilities
1. **Catalog vs Farm Stock**: `FishSpecies` in `src/types/fish.ts` and `src/mocks/fish.ts` mingled farm parameters (water temp, pH, tank capacity) with customer presentation (price label, enquiry buttons, images).
2. **Order Management vs Cart**: `CommerceContext.tsx` managed both customer cart operations and farm administrative order status mutations.
3. **Farm Management Mega-Component**: `ManagementModule.tsx` managed 11 separate operational domains inside one 250+ line conditional switch with generic row states.
4. **Dead Features Folder**: `src/features/*` duplicated code from `src/pages` without being connected to the router.

---

## (d) Incomplete or Broken Features Found
1. **No Product Details Page**: Clicking a fish or navigating to `/products/:id` was unsupported.
2. **No Role Permissions Matrix**: Route access and sidebar links were hardcoded inside layouts without a central permission model.
3. **Direct LocalStorage Access**: Components directly mutated browser localStorage without version validation, leading to stale schema corruption.
4. **Order Status Transitions Unrestricted**: Any status could transition to any status without domain guardrails.
5. **No Canonical `/cart` route**: Only `/customer/cart` was reachable.
