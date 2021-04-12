<template>
  <transition name="fade">
    <div v-show="show" class="photo-card" @click="modalPhoto(mediaUrl)">
      <img :alt="caption" :src="mediaUrl" />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

// fazer o model PHOTO
export default Vue.extend({
  props: {
    caption: {
      type: String,
      default: ''
    },
    mediaUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  },
  methods: {
    modalPhoto(mediaUrl: string): void {
      document.querySelector('.modal-container')?.classList.toggle('active')
      document.querySelector('body')?.classList.toggle('no-scroll')

      const photo = document.createElement('img')
      photo.setAttribute('src', mediaUrl)
      photo.classList.add('photo-modal')

      const photoContainer = document.querySelector('.photo-container')

      if (photoContainer != null) {
        photoContainer.innerHTML = ''
        photoContainer.appendChild(photo)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.photo-card {
  background-color: #fafcf6;
  margin-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(50, 50, 90, 0.6);
  overflow: hidden;
  transition: 0.3s ease-in-out;
  break-inside: avoid-column;
  cursor: pointer;
  // opacity: 0;

  &:hover {
    box-shadow: 8px 8px 10px rgba(50, 50, 90, 0.9);
    transform: scale(0.99);

    img {
      transform: scale(1.1);
    }
  }

  &.fade-in {
    opacity: 1;
  }

  h2 {
    font-size: 1.12rem;
    padding: 0.8rem;
    text-align: center;
  }
}
</style>
