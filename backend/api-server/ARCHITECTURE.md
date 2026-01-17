# Backend API Server Architecture Guide

## System Design Philosophy (Adopted)

This backend follows the **system design philosophy** outlined in `frontend/docs/system design phylosophy.md`:
- **Domain logic is isolated** from infrastructure, frameworks, and SDKs.
- **Adapters** are used for all external dependencies (DB, auth, storage, payments, etc.).
- **API boundaries** are enforced: frontend never talks directly to DB or business logic.
- **Replaceability**: All infrastructure is swappable via interfaces.
- **Testability**: Core logic can run in memory, without real infra.
- **Statelessness**: No critical state in memory or local files.
- **Configuration**: All config via environment variables.
- **Exit plans**: Every major dependency can be swapped without rewriting core logic.

## Folder Responsibilities

- `controllers/`: API endpoint handlers. Only parse input, call use cases/services, and format output. **No business logic.**
- `services/`: Application/business logic. Should depend only on interfaces, not infrastructure. **No direct DB/SDK calls.**
- `models/`: Data models and domain entities. Pure logic, no framework or DB code.
- `routes/`: Express route definitions. Only wire up controllers.
- `utils/`: Pure utility functions, helpers, and validation. No side effects.

- `adapters/`: Implementations for all external dependencies (DB, auth, storage, etc). Only these talk to external systems. Each adapter implements a corresponding interface (e.g., `IDatabaseAdapter`, `IAuthAdapter`, `IStorageAdapter`).


## Enforced Boundaries

- Controllers → Services (use cases) → Adapters (infrastructure)
- No business logic in controllers or adapters
- No SDKs or DB clients in services or models
- All external dependencies behind interfaces

## Adapter/Service Pattern (Examples)

- **Database:**
	- Interface: `IDatabaseAdapter`
	- Adapter: `MongoDatabaseAdapter` (implements `IDatabaseAdapter`)
	- Service: `DatabaseService` (depends on `IDatabaseAdapter`)

- **Authentication:**
	- Interface: `IAuthAdapter`
	- Adapter: `JwtAuthAdapter` (implements `IAuthAdapter`)
	- Service: `AuthService` (depends on `IAuthAdapter`)

- **Storage:**
	- Interface: `IStorageAdapter`
	- Adapter: `LocalStorageAdapter` (implements `IStorageAdapter`)
	- Service: `StorageService` (depends on `IStorageAdapter`)

## How to Add a New Adapter/Service

1. Define an interface in `adapters/` (e.g., `INotificationAdapter.ts`).
2. Implement the interface for your provider (e.g., `SendgridNotificationAdapter.ts`).
3. Create a service in `services/` that depends on the interface (e.g., `NotificationService`).
4. Wire up the service in your app entry point, injecting the adapter.
5. Use the service in controllers/routes—never call adapters or SDKs directly from business logic.

## Example: Using a Service in a Route

```ts
import { NotificationService } from './services/notificationService';
import { SendgridNotificationAdapter } from './adapters/SendgridNotificationAdapter';

const notificationAdapter = new SendgridNotificationAdapter(apiKey);
const notificationService = new NotificationService(notificationAdapter);

app.post('/api/notify', async (req, res) => {
	await notificationService.sendEmail(req.body.email, req.body.message);
	res.json({ success: true });
});
```

## Refactor Roadmap

1. **Audit**: Identify business logic in controllers/services that touches infrastructure.
2. **Extract**: Move business logic to pure services/use cases.
3. **Introduce interfaces**: For all external dependencies.
4. **Create adapters**: For DB, auth, storage, etc.
5. **Enforce boundaries**: Via code review and checklists.
6. **Document exit plans**: For each major dependency.

## Code Review Questions (Always Ask)
- Where does the business logic live?
- Does this code introduce a direct dependency on a vendor or provider?
- If we remove this tool, what breaks?
- Is any decision-making happening in the UI or controller?
- Can this logic be unit-tested without infra?

---

**This file must be kept up to date as the codebase evolves. All contributors must read and follow these rules.**
