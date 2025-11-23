<script setup>
import { ref } from "vue";
import AssetTest from "./components/AssetTest.vue";

const message = ref("VMG Labs - Deployment Test");
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>{{ message }}</h1>
      <p class="subtitle">Basic Vue.JS Interactivity Test</p>
    </header>
    <main class="main">
      <AssetTest />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.subtitle {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
