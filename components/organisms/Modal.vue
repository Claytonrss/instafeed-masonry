<template>
  <section class="modal-container">
    <div class="modal">
      <button class="close" @click="closeModal()">
        <img src="@/assets/image/close.svg" alt="Icone de fechar" />
      </button>
      <div class="photo-container"></div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    const modalContainer = document.querySelector('.modal-container')

    modalContainer?.addEventListener('click', (e) => {
      if (modalContainer === e.target) {
        this.closeModal()
      }
    })

    document.onkeydown = (e) => {
      if (e.key === 'Escape') {
        this.closeModal()
      }
    }
  },
  methods: {
    closeModal(): void {
      document.querySelector('.modal-container')?.classList.remove('active')
    }
  }
})
</script>

<style lang="scss">
.modal-container {
  position: fixed;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  display: none;

  .modal {
    position: relative;

    .photo-modal {
      max-height: 90vh;
      border-radius: 4px;
    }

    button {
      position: absolute;
      top: -20px;
      right: -20px;
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 50%;
      background-image: $blueGradient;
      cursor: pointer;
      padding: 0.7rem;

      &:hover {
        background-color: rgba(255, 38, 0, 1);
      }
    }
  }

  &.active {
    display: flex;
    animation: modal 0.3s forwards;
  }

  @keyframes modal {
    from {
      opacity: 0;
      transform: translate(0, -60px, 0);
    }
    to {
      opacity: 1;
      transform: translate(0, 0, 0);
    }
  }
}
</style>
