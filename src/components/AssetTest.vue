<script setup>
import { ref } from "vue";

// Test importing an image asset
import logoUrl from "../assets/vite.svg";

// Test importing a CSS file
import "../assets/test-styles.css";

// Expose import.meta.env values for template use
const baseUrl = import.meta.env.BASE_URL;
const mode = import.meta.env.MODE;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

const testItems = ref([
  {
    id: 1,
    title: "Image Asset Test",
    description: "Testing if images load correctly from assets folder",
    status: "checking...",
  },
  {
    id: 2,
    title: "CSS Asset Test",
    description: "Testing if CSS files load correctly",
    status: "checking...",
  },
  {
    id: 3,
    title: "Base Path Test",
    description: "Testing if base path /webapp/my-webapp/ is working",
    status: "checking...",
  },
]);

const checkAssetLoading = () => {
  // Check if image loaded
  const img = new Image();
  img.onload = () => {
    testItems.value[0].status = "✓ Image loaded successfully";
  };
  img.onerror = () => {
    testItems.value[0].status = "✗ Image failed to load";
  };
  img.src = logoUrl;

  // Check if CSS loaded (check for a class that should exist)
  setTimeout(() => {
    const testElement = document.querySelector(".css-test-element");
    if (testElement) {
      const styles = window.getComputedStyle(testElement);
      if (styles.backgroundColor === "rgb(34, 197, 94)") {
        testItems.value[1].status = "✓ CSS loaded successfully";
      } else {
        testItems.value[1].status = "⚠ CSS loaded but styles may be incorrect";
      }
    } else {
      testItems.value[1].status = "✗ CSS test element not found";
    }
  }, 100);

  // Check base path
  const basePath = import.meta.env.BASE_URL;
  testItems.value[2].status = `Base path: ${basePath}`;
};
</script>

<template>
  <div class="asset-test">
    <div class="test-header">
      <h2>Asset Loading Tests</h2>
      <button @click="checkAssetLoading" class="test-button">
        Run Tests
      </button>
    </div>

    <div class="test-grid">
      <div class="test-card">
        <h3>Image Asset</h3>
        <div class="image-container">
          <img :src="logoUrl" alt="Vite Logo" class="test-image" />
        </div>
        <p class="test-description">
          This image is imported from src/assets/vite.svg
        </p>
      </div>

      <div class="test-card">
        <h3>CSS Asset</h3>
        <div class="css-test-element">
          <p>This element has styles from test-styles.css</p>
        </div>
        <p class="test-description">
          Background color should be green if CSS loaded correctly
        </p>
      </div>
    </div>

    <div class="test-results">
      <h3>Test Results</h3>
      <ul class="results-list">
        <li v-for="item in testItems" :key="item.id" class="result-item">
          <strong>{{ item.title }}:</strong>
          <span :class="{
            'status-success': item.status.startsWith('✓'),
            'status-error': item.status.startsWith('✗'),
            'status-warning': item.status.startsWith('⚠')
          }">
            {{ item.status }}
          </span>
          <p class="result-description">{{ item.description }}</p>
        </li>
      </ul>
    </div>

    <div class="info-box">
      <h3>Build Information</h3>
      <ul>
        <li><strong>Base URL:</strong> {{ baseUrl }}</li>
        <li><strong>Mode:</strong> {{ mode }}</li>
        <li><strong>Dev:</strong> {{ isDev ? "Yes" : "No" }}</li>
        <li><strong>Prod:</strong> {{ isProd ? "Yes" : "No" }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.asset-test {
  width: 100%;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.test-header h2 {
  margin: 0;
  color: #333;
}

.test-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.test-button:hover {
  background: #5568d3;
}

.test-button:active {
  transform: scale(0.98);
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.test-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.test-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.25rem;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.test-image {
  width: 100px;
  height: 100px;
}

.test-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.test-results {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.test-results h3 {
  margin: 0 0 1rem 0;
  color: #333;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.result-item strong {
  color: #333;
  display: block;
  margin-bottom: 0.25rem;
}

.result-item .status-success {
  color: #22c55e;
  font-weight: 600;
}

.result-item .status-error {
  color: #ef4444;
  font-weight: 600;
}

.result-item .status-warning {
  color: #f59e0b;
  font-weight: 600;
}

.result-description {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0.5rem 0 0 0;
}

.info-box {
  background: #eff6ff;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 1.5rem;
}

.info-box h3 {
  margin: 0 0 1rem 0;
  color: #1e40af;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  padding: 0.5rem 0;
  color: #1e40af;
}

.info-box strong {
  color: #1e3a8a;
}
</style>

