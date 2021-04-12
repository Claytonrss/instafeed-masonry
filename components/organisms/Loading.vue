<template>
  <section class="mask">
    <Spinner />
  </section>
</template>

<style lang="scss" scoped>
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(22, 22, 22, 0.99);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.hide {
  display: none;
}
</style>
