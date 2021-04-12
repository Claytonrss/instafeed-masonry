<template>
  <div class="spinner"></div>
</template>

<style lang="scss" scoped>
.spinner {
  width: 60px;
  height: 60px;
  border: 1rem solid rgba(255, 255, 255, 0.9);
  border-radius: 5%;
  animation: rotate 2s infinite;
}

@keyframes rotate {
  50% {
    transform: rotate(360deg);
    border-radius: 50%;
    border: 1rem solid rgba(24, 28, 27, 0.1);
  }
  100% {
    transform: rotate(0deg);
    border: 1rem solid rgba(255, 255, 255, 0.9);
    border-radius: 5%;
  }
}
</style>
