import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
import { Photo } from '~/models'

@Module({ name: 'photos', stateFactory: true, namespaced: true })
export default class Photos extends VuexModule {
  private photos: Photo[] = []
  private token =
    'IGQVJXLXJ6VktwM3A2WnBNenl2aVRud0FRZAzRjd0lZAb0Q1SzdFbnkwUzFCdVlhbXdMU3hURWZAOMExsaG5zbmxmNjU0OXlTNHFOeU5yMG1JaWd1TWRMTmhWTVpsRThETFF3UW4zVmxvLW53a01xcmFiWAZDZD'

  private baseURL =
    'https://graph.instagram.com/me/media?fields=media_type,media_url,caption&access_token=' +
    this.token

  public get $all(): Array<Photo> {
    return this.photos
  }

  public get $url(): string {
    return this.baseURL
  }

  @Mutation
  private SET_PHOTOS(photo: Photo) {
    this.photos.push(photo)
  }

  @Mutation
  private SET_URL(url: string) {
    this.baseURL = url
  }

  @Action
  public setPhotosLocalStorage(photos: Array<Photo>) {
    try {
      photos.forEach((photo: Photo) => {
        if (photo.media_type === 'IMAGE') {
          this.context.commit('SET_PHOTOS', photo)
        }
      })
    } catch (error) {
      console.warn(error)
    }
  }

  @Action
  public async setPhotosAPI() {
    try {
      let photos = []
      let hasMore = false
      let countPage = 1
      const limitPages = 7

      do {
        const url = this.context.getters.$url
        const response = await $axios.$get(url)
        photos = response.data

        photos.forEach((photo: Photo) => {
          if (photo.media_type === 'IMAGE') {
            this.context.commit('SET_PHOTOS', photo)
          }
        })

        const newUrl = response?.paging.next

        if (newUrl) {
          this.context.commit('SET_URL', newUrl)
          hasMore = true
        } else {
          hasMore = false
        }

        countPage++
      } while (hasMore && countPage <= limitPages)
    } catch (error) {
      console.warn(error)
    }
  }
}
