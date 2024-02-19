<template>
  <div class="loading-screen">
    <div class="loading-spinner"></div>
    <!-- Optional: Add a text message below the spinner -->
    <p></p>
  </div>
</template>

<script>
export default {
  name: 'Loader'
};
</script>

<style lang="scss" scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.loading-spinner {
  border: 8px solid rgba(231, 51, 255, 0.3); /* Thicker border */
  border-radius: 50%;
  border-top: 8px solid #1e78ff; /* Thicker border-top with color */
  width: 600px; /* Larger width */
  height: 600px; /* Larger height */
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  