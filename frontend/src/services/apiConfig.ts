export const apiConfig = {
  baseUrl: (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL || '/api/v1',
  timeoutMs: 15000,
  isMockMode: true,
};
