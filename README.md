# Neptune Deployment Test

A basic Vue 3 application configured for deployment testing to Neptune Open Edition.

## Features

- ✅ Vue 3 with Composition API
- ✅ Vite build tool
- ✅ Neptune-compatible base path configuration (`/webapp/my-webapp/`)
- ✅ Asset loading tests (images, CSS)
- ✅ Build verification tools

## Testing Instructions

Follow these steps to test the application deployment to Neptune:

### Step 1: Install Dependencies

First, install all required npm packages:

```bash
npm install
```

### Step 2: Configure Base Path

Before building, update the base path in `vite.config.js` to match your Neptune Web App name:

- Open `vite.config.js`
- Change `/webapp/my-webapp/` to match your actual Neptune Web App name
- For example, if your Neptune Web App is named "my-app", use `/webapp/my-app/`

**Important:** The base path in `vite.config.js` must exactly match the Web App name in Neptune.

### Step 3: Build the Application

Build the application for production:

```bash
npm run build
```

This will create a `dist/` folder containing all the production-ready files.

### Step 4: Deploy to Neptune Web App

1. **Locate the build output:**
   - The build creates a `dist/` folder in the project root
   - This folder contains:
     - `index.html` (main HTML file)
     - `assets/` folder (containing CSS and JavaScript files)

2. **Upload to Neptune:**
   - Open your Neptune Web App in the Neptune administration interface
   - Upload the **contents** of the `dist/` folder (not the folder itself)
   - Ensure all files from `dist/` are uploaded to the root of your Web App

3. **Verify deployment:**
   - Access your Neptune Web App URL
   - The application should load and display the "Neptune Deployment Test" interface
   - Click the "Run Tests" button to verify:
     - ✅ Image assets load correctly
     - ✅ CSS assets load correctly
     - ✅ Base path is configured properly

## Development

For local development and testing:

```bash
npm run dev
```

This starts a local development server (typically at `http://localhost:5173`).

**Note:** The dev server uses a different base path (`/`) than production. The production build uses the Neptune-compatible base path configured in `vite.config.js`.

## Build Output

After running `npm run build`, the `dist/` folder will contain:

- `index.html` - Main HTML entry point
- `assets/` - Compiled CSS and JavaScript files with content hashing for cache busting

All asset paths are automatically adjusted to work with the configured base path.

## Project Structure

```
smoketest/
├── src/
│   ├── assets/          # Static assets (images, CSS)
│   │   ├── vite.svg
│   │   └── test-styles.css
│   ├── components/      # Vue components
│   │   └── AssetTest.vue
│   ├── App.vue          # Root component
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration (Neptune-compatible)
└── package.json         # Dependencies
```

