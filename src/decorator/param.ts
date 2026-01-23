import { storage } from '../metadata/metadata-storage'

export function Socket() {
  return function (target: object, propertyName: string, paramIndex: number) {
    storage.setParamMd(target.constructor, propertyName, paramIndex, ['socket'])
  }
}
