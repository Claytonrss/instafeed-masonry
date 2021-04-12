import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Photos from '@/store/photos'

/* eslint-disable import/no-mutable-exports */
let photos: Photos

const initializeStores = (store: Store<any>): void => {
  photos = getModule(Photos, store)
}

export { initializeStores, photos }
