# Configuration Guide

This document explains how to configure Neptune server and web app settings using environment variables.

## Overview

Instead of hardcoding server names and web app names in the code, we use environment variables that can be easily changed for different environments (development, staging, production).

## Setup

### 1. Create Environment File

Create a `.env` file in the project root with the following variables:

```env
# Neptune Web App Name (used in vite.config.js base path)
# This should match the Web App "Name" in Neptune (e.g., "equipment")
VITE_NEPTUNE_WEBAPP_NAME=equipment

# Neptune Open Edition Server (public host that exposes /proxy)
# e.g. https://dxp24.perdeby.com
VITE_NEPTUNE_SERVER_URL=https://dxp24.perdeby.com

# SAP/Neptune backend origin (encoded inside /proxy/)
# e.g. http://vhcalabaci.saportals.com:50700
VITE_NEPTUNE_BACKEND_URL=http://vhcalabaci.saportals.com:50700

# Neptune Web App GUID / API ID (suffix appended to proxy URLs)
VITE_NEPTUNE_API_ID=baf7b7e4-d0a6-4467-af19-d00249e1b3af
# (Optional legacy: VITE_NEPTUNE_GUID)

# SAP Client (e.g., "800")
VITE_SAP_CLIENT=800
```

### 2. Update for Your Environment

Replace the values with your actual Neptune server configuration:

- **VITE_NEPTUNE_WEBAPP_NAME**: The name of your Web App in Neptune (must match exactly)
- **VITE_NEPTUNE_SERVER_URL**: The Neptune Open Edition server that hosts `/proxy`
- **VITE_NEPTUNE_BACKEND_URL**: The SAP/Neptune backend origin that actually serves `/neptune/api`
- **VITE_SAP_CLIENT**: Your SAP client number

## How It Works

### Vite Configuration

The `vite.config.js` file reads `VITE_NEPTUNE_WEBAPP_NAME` to set the base path:

```js
const webappName = process.env.VITE_NEPTUNE_WEBAPP_NAME || "equipment";
base: `/webapp/${webappName}/`;
```

### API Configuration

The `src/config/neptune.js` file provides utility functions that use environment variables:

- `getNeptuneApiUrl(entity, operation)` - Builds endpoint URLs
- `buildNeptuneQueryParams(params)` - Formats query parameters
- `buildNeptuneApiRequest(entity, operation, params)` - Returns `{ url, params }` ready for Axios (proxy-aware)

### Example Usage

```js
import { buildNeptuneApiRequest } from "@/config/neptune";
import axios from "axios";

const fetchEquipment = async () => {
  try {
    const request = buildNeptuneApiRequest("equipment", "Search", {
      IV_PARAMS: {},
      IV_SORTBY: [],
      IS_PAGING: {
        TAKE: 50,
        CURRENTPAGE: 1,
        SKIP: 0,
        SERVER_PAGINATION: true,
      },
    });

    const response = await axios.get(
      request.url,
      request.params ? { params: request.params } : undefined
    );
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
