# Neptune Deployment Test

A basic Vue 3 application configured for deployment testing to Neptune Open Edition.

## Features

- ✅ Vue 3 with Composition API
- ✅ Vite build tool
- ✅ Neptune-compatible base path configuration (`/webapp/my-webapp/`)
- ✅ Asset loading tests (images, CSS)
- ✅ Build verification tools

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the base path in `vite.config.js`:
   - Change `/webapp/my-webapp/` to match your Neptune Web App name
   - For example, if your Neptune Web App is named "my-app", use `/webapp/my-app/`

## Development

Run the development server:
```bash
npm run dev
```

## Build

Build for production:
```bash
npm run build
```

The build output will be in the `dist/` folder, which Neptune expects.

## Deployment to Neptune

1. Build the application: `npm run build`
2. Upload the contents of the `dist/` folder to your Neptune Web App
3. Ensure the Web App name in Neptune matches the base path in `vite.config.js`

## Testing Asset Loading

The app includes a test component (`AssetTest.vue`) that verifies:
- Image assets load correctly
- CSS assets load correctly
- Base path is configured properly

After deployment, click the "Run Tests" button to verify all assets are loading correctly.

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

