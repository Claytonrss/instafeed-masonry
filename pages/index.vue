<template>
  <InstaFeedTemplate v-if="success" />
  <div v-else class="falha">
    <h1>
      Desculpe!
      <br /><br />
      No momento não é possível buscar dados da API do Instagram para te mostrar
      as fotos.
      <br /><br />
      Mas se quiser, pode conferir diratamente seguindo o link
      <a href="https://www.instagram.com/clayton.rssouza/">@clayton.rssouza</a>.
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { photos } from '~/store'

export default Vue.extend({
  data() {
    return {
      success: true
    }
  },
  beforeMount() {
    window.addEventListener('DOMContentLoaded', this.afterAllImagesLoaded)
  },
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
        photos.setPhotosLocalStorage(jsonPhotos)
      }
    } else {
      if (!(await photos.setPhotosAPI())) {
        this.success = false
      }
      // GRAVAR NO LOCAL STORAGE PARA NÃO FICAR BUSCANDO SEMPRE
      const localPhotos = photos.$all
      if (localPhotos.length) {
        const jsonPhotos = JSON.stringify(localPhotos)
        const now = new Date()
        window.localStorage.setItem('instaPhotos', jsonPhotos)
        window.localStorage.setItem('lastUpdatePhotos', now.toString())
      }
    }
  },
  methods: {
    afterAllImagesLoaded() {
      function imageLoaded() {
        counter--
        if (counter === 0) {
          // quando chega no 0 a ultima imagem foi carregada
          document.querySelector('.mask')?.classList.add('hide')
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

<style scoped>
.falha {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.falha h1 {
  max-width: 30%;
  line-height: 2.5rem;
}
</style>
