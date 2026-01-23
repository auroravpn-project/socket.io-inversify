import { BaseMetadata } from './metadata'

class MetadataStorage {
  public metadata: BaseMetadata = new BaseMetadata()

  setControllerMd(constructor: Function) {
    this.metadata.setControllerMd(constructor)
  }

  setMessageMd(constructor: Function, propertyName: string, event: string) {
    const ctrl = this.metadata.getControllerMd(constructor.name)
    if (ctrl) {
      ctrl.setMessageMd(propertyName, event)
      return
    }
    this.setControllerMd(constructor)
    this.setMessageMd(constructor, propertyName, event)
  }

  setParamMd(
    constructor: Function,
    propertyName: string,
    paramIndex: number,
    location: string[]
  ) {
    const message = this.metadata
      .getControllerMd(constructor.name)
      ?.getMessageMd(propertyName)
    if (message) {
      message.setParameterMd(paramIndex, location)
      return
    }
    this.setMessageMd(constructor, propertyName, '')
    this.setParamMd(constructor, propertyName, paramIndex, location)
  }
}

export const storage = new MetadataStorage()
