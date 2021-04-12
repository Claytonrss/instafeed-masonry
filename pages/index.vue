<template>
  <InstaFeedTemplate />
</template>

<script lang="ts">
import Vue from 'vue'
import { photos } from '~/store'

export default Vue.extend({
  async mounted() {
    // verificar se as fotos já estão salvas no localstorage
    const localPhotos = window.localStorage.getItem('instaPhotos')
    const lastUpdatePhotos = window.localStorage.getItem('lastUpdatePhotos')

    // saber se faz mais de 24horas desde a ultima requisição
    let daysDiff = 0
    if (lastUpdatePhotos) {
      const now = new Date().getTime()
      const lastUpdate = new Date(lastUpdatePhotos).getTime()
      daysDiff = Math.floor((now - lastUpdate) / (24 * 60 * 60 * 1000))
    }

    if (localPhotos || daysDiff) {
      if (localPhotos != null) {
        const jsonPhotos = JSON.parse(localPhotos)
        await photos.setPhotosLocalStorage(jsonPhotos)
      }
    } else {
      await photos.setPhotosAPI()
      // GRAVAR NO LOCAL STORAGE PARA NÃO FICAR BUSCANDO SEMPRE
      const localPhotos = photos.$all
      if (localPhotos.length) {
        const jsonPhotos = JSON.stringify(localPhotos)
        const now = new Date()
        window.localStorage.setItem('instaPhotos', jsonPhotos)
        window.localStorage.setItem('lastUpdatePhotos', now.toString())
      }
    }

    window.addEventListener('DOMContentLoaded', this.afterAllImagesLoaded)
  },
  methods: {
    afterAllImagesLoaded() {
      function imageLoaded() {
        counter--
        if (counter === 0) {
          // quando chega no 0 a ultima imagem foi carregada
          document.querySelector('.mask')?.classList.add('hide')
          console.log('teste')
        }
      }

      const images = [...Array.from(document.querySelectorAll('img'))]
      let counter = images.length

      images.forEach((image) => {
        if (image.complete) {
          imageLoaded.call(this)
        } else {
          image.addEventListener('load', imageLoaded)
        }
      })
    }
  }
})
</script>
