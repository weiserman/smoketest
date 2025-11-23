# Configuration Guide

This document explains how to configure Neptune server and web app settings using environment variables.

## Overview

Instead of hardcoding server names and web app names in the code, we use environment variables that can be easily changed for different environments (development, staging, production).

## Setup

### 1. Create Environment File

Create a `.env` file in the project root with the following variables:

```env
# Neptune Web App Name (used in vite.config.js base path)
# This should match the Web App name in Neptune (e.g., "smoketest", "my-app")
VITE_NEPTUNE_WEBAPP_NAME=smoketest

# Neptune Server Configuration
# The base URL of your Neptune Open Edition server
# Examples:
#   - https://dxp24.co.za:8081 (with proxy)
#   - http://vhcalabaci.saportals.com:50700 (direct)
VITE_NEPTUNE_SERVER_URL=https://dxp24.co.za:8081

# Neptune API Base Path (usually /neptune/api)
VITE_NEPTUNE_API_BASE=/neptune/api

# SAP Client (e.g., "800")
VITE_SAP_CLIENT=800

# Proxy Configuration (if using a proxy)
# Set to "true" if your Neptune server requires a proxy
VITE_USE_PROXY=true

# Proxy Base Path (if using proxy, e.g., "/proxy")
VITE_PROXY_BASE=/proxy
```

### 2. Update for Your Environment

Replace the values with your actual Neptune server configuration:

- **VITE_NEPTUNE_WEBAPP_NAME**: The name of your Web App in Neptune (must match exactly)
- **VITE_NEPTUNE_SERVER_URL**: Your Neptune server URL (with or without protocol depending on proxy setup)
- **VITE_SAP_CLIENT**: Your SAP client number
- **VITE_USE_PROXY**: Set to `"true"` if using a proxy, `"false"` otherwise

## How It Works

### Vite Configuration

The `vite.config.js` file reads `VITE_NEPTUNE_WEBAPP_NAME` to set the base path:

```js
const webappName = process.env.VITE_NEPTUNE_WEBAPP_NAME || "smoketest";
base: `/webapp/${webappName}/`
```

### API Configuration

The `src/config/neptune.js` file provides utility functions that use environment variables:

- `getNeptuneApiBaseUrl()` - Builds the complete API base URL
- `getNeptuneApiUrl(entity, operation)` - Builds endpoint URLs
- `buildNeptuneQueryParams(params)` - Formats query parameters

### Example Usage

```js
import { getNeptuneApiUrl, buildNeptuneQueryParams } from "@/config/neptune";
import axios from "axios";

const fetchEquipment = async () => {
  try {
    const url = getNeptuneApiUrl("equipment", "Search");
    const params = buildNeptuneQueryParams({
      IV_PARAMS: {},
      IV_SORTBY: [],
      IS_PAGING: {
        TAKE: 50,
        CURRENTPAGE: 1,
        SKIP: 0,
        SERVER_PAGINATION: true,
      },
    });

    const response = await axios.get(url, { params });
    return response.data;
  } catch (err) {
    console.error("Failed to load equipment:", err);
    throw err;
  }
};
```

## Benefits

1. **No Hardcoding**: Server names and web app names are not hardcoded in the source code
2. **Environment-Specific**: Easy to switch between dev, staging, and production
3. **Version Control Safe**: `.env` files are in `.gitignore`, so sensitive configs aren't committed
4. **Centralized**: All Neptune configuration is in one place (`src/config/neptune.js`)

## Important Notes

- All Vite environment variables must be prefixed with `VITE_` to be accessible in the application
- The `.env` file should be added to `.gitignore` (already configured)
- Create a `.env.example` file as a template for other developers
- Restart the dev server after changing `.env` values

