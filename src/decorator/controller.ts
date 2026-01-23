import { storage } from '../metadata/metadata-storage'

export function Controller() {
  return function (constructor: Function) {
    storage.setControllerMd(constructor)
  }
}
