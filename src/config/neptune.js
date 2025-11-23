/**
 * Neptune Configuration
 * 
 * This file centralizes all Neptune-related configuration.
 * Values are loaded from environment variables (VITE_*).
 */

// Web App Configuration
export const NEPTUNE_WEBAPP_NAME = 
  import.meta.env.VITE_NEPTUNE_WEBAPP_NAME || "smoketest";

// Server Configuration
export const NEPTUNE_SERVER_URL = 
  import.meta.env.VITE_NEPTUNE_SERVER_URL || "https://dxp24.co.za:8081";

export const NEPTUNE_API_BASE = 
  import.meta.env.VITE_NEPTUNE_API_BASE || "/neptune/api";

export const SAP_CLIENT = 
  import.meta.env.VITE_SAP_CLIENT || "800";

// Proxy Configuration
export const USE_PROXY = 
  import.meta.env.VITE_USE_PROXY === "true";

export const PROXY_BASE = 
  import.meta.env.VITE_PROXY_BASE || "/proxy";

/**
 * Builds the full Neptune API base URL
 * @returns {string} The complete API base URL
 */
export function getNeptuneApiBaseUrl() {
  if (USE_PROXY) {
    // If using proxy, encode the Neptune server URL
    const encodedServerUrl = encodeURIComponent(
      `${NEPTUNE_SERVER_URL.replace(/^https?:\/\//, "")}${NEPTUNE_API_BASE}`
    );
    return `${NEPTUNE_SERVER_URL}${PROXY_BASE}/${encodedServerUrl}`;
  }
  
  return `${NEPTUNE_SERVER_URL}${NEPTUNE_API_BASE}`;
}

/**
 * Builds a Neptune API endpoint URL
 * @param {string} entity - The entity name (e.g., "equipment")
 * @param {string} operation - The operation (e.g., "Search", "Read")
 * @returns {string} The complete endpoint URL
 */
export function getNeptuneApiUrl(entity, operation) {
  const baseUrl = getNeptuneApiBaseUrl();
  return `${baseUrl}/${entity}/${operation}`;
}

/**
 * Builds query parameters for Neptune API calls
 * @param {Object} params - Query parameters object
 * @returns {Object} Formatted query parameters
 */
export function buildNeptuneQueryParams(params = {}) {
  const queryParams = {
    "sap-client": SAP_CLIENT,
    ...params,
  };

  // Stringify JSON parameters
  if (params.IV_PARAMS && typeof params.IV_PARAMS === "object") {
    queryParams.IV_PARAMS = JSON.stringify(params.IV_PARAMS);
  }
  if (params.IV_SORTBY && typeof params.IV_SORTBY === "object") {
    queryParams.IV_SORTBY = JSON.stringify(params.IV_SORTBY);
  }
  if (params.IS_PAGING && typeof params.IS_PAGING === "object") {
    queryParams.IS_PAGING = JSON.stringify(params.IS_PAGING);
  }

  return queryParams;
}

