# Neptune Configuration

This directory contains configuration utilities for Neptune API integration.

## Setup

1. Create a `.env` file in the project root (copy from `.env.example` if available):

```env
# Neptune Web App Name (used in vite.config.js base path)
VITE_NEPTUNE_WEBAPP_NAME=smoketest

# Neptune Server Configuration
VITE_NEPTUNE_SERVER_URL=https://dxp24.co.za:8081

# Neptune API Base Path
VITE_NEPTUNE_API_BASE=/neptune/api

# SAP Client
VITE_SAP_CLIENT=800

# Proxy Configuration
VITE_USE_PROXY=true
VITE_PROXY_BASE=/proxy
```

2. Import and use the configuration in your components:

```js
import { getNeptuneApiUrl, buildNeptuneQueryParams } from '@/config/neptune';
import axios from 'axios';

const fetchEquipment = async () => {
  try {
    const url = getNeptuneApiUrl('equipment', 'Search');
    const params = buildNeptuneQueryParams({
      IV_PARAMS: {},
      IV_SORTBY: [],
      IS_PAGING: {
        TAKE: 50,
        CURRENTPAGE: 1,
        SKIP: 0,
        SERVER_PAGINATION: true
      }
    });
    
    const response = await axios.get(url, { params });
    return response.data;
  } catch (err) {
    console.error('Failed to load equipment:', err);
    throw err;
  }
};
```

## Configuration Functions

- `getNeptuneApiBaseUrl()` - Returns the complete API base URL
- `getNeptuneApiUrl(entity, operation)` - Builds a complete endpoint URL
- `buildNeptuneQueryParams(params)` - Formats query parameters for Neptune API

