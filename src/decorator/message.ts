import { storage } from '../metadata/metadata-storage'

export function Message(event: string) {
  return function (
    target: object,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    storage.setMessageMd(target.constructor, propertyName, event)
  }
}
