# Frontend Service Architecture Guide

## System Design Philosophy (Adopted)

This frontend follows the **system design philosophy**:
- **All API and infrastructure logic is behind interfaces and adapters.**
- **React components and hooks never call fetch/axios or SDKs directly.**
- **All external dependencies are swappable via interfaces.**
- **Testability:** Components and hooks can be tested with mock services.
- **Replaceability:** API, storage, and other services can be swapped without rewriting business/UI logic.

## Folder Responsibilities

- `services/`: Contains all service interfaces and implementations (e.g., `IApiService`, `HttpApiService`).
- `hooks/`: Custom React hooks that depend on service interfaces, not concrete implementations.
- `components/` and `pages/`: UI logic only, never direct API calls.


## Adapter/Service Pattern (Examples)

- **API:**
  - Interface: `IApiService`
  - Adapter: `HttpApiService` (implements `IApiService`)
  - Usage: Injected into hooks/components (e.g., `useFileUpload(apiService)`).

- **User Storage:**
  - Interface: `IUserStorage`
  - Adapter: `LocalUserStorage` (implements `IUserStorage`)
  - Usage: Used in `useAuth` for storing/retrieving user session.

- **Wallet/Blockchain:**
  - Interface: `IWalletService`
  - Adapter: `StacksWalletService` (implements `IWalletService`)
  - Usage: Used in `WalletConnect` for all wallet and contract interactions.

- **Shared Types:**
  - All API response and file upload types are now in `src/types/api.ts`.

## Legacy Utilities

- The old `utils/api.ts` (ApiClient/apiClient) has been removed. All API usage must go through the service interface pattern.

## How to Add a New Service

1. Define an interface in `services/` (e.g., `INotificationService.ts`).
2. Implement the interface (e.g., `HttpNotificationService.ts`).
3. Inject the service into hooks/components as needed.
4. For testing, provide a mock implementation.

## Example: Using a Service in a Hook

```ts
import { useFileUpload } from '../hooks/useFileUpload';
import { apiService } from '../services/apiService';

const { uploadFile } = useFileUpload(apiService);
```

## Why This Matters

- **Future-proof:** Easily migrate to new APIs or providers.
- **Testable:** Swap in mocks for unit/integration tests.
- **Maintainable:** UI and business logic are never coupled to infrastructure.

---

**All contributors must follow this pattern for new features and refactors.**
