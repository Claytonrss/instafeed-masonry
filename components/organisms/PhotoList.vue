<template>
  <section class="photoList">
    <PhotoCard
      v-for="photo in $photos"
      :key="photo.id"
      :caption="photo.caption"
      :media-url="photo.media_url"
    >
    </PhotoCard>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { photos } from '~/store'

export default Vue.extend({
  computed: {
    $photos() {
      const photosR = photos.$all.slice()
      const orderRandom = () => {
        return 0.5 - Math.random()
      }

      photosR.sort(orderRandom)
      return photosR
    }
  }
})
</script>

<style lang="scss" scoped>
.photoList {
  column-count: 4;
  padding: 1rem;
  max-width: 1980px;
  margin: 0 auto;
  break-inside: avoid-column;

  @media only screen and (max-width: 1024px) {
    column-count: 3;
  }

  @media only screen and (max-width: 768px) {
    column-count: 2;
  }
  @media only screen and (max-width: 480px) {
    column-count: 1;
  }
}
</style>
