import { Metadata } from '@auroravpn/class-metadata'

export class BaseMetadata extends Metadata {
  constructor() {
    super()
  }
  getControllerMd(constructorName: string) {
    return this.get(constructorName) as ControllerMetadata
  }
  setControllerMd(constructor: Function) {
    const socket = this.getControllerMd(constructor.name)
    if (socket) {
      socket.target = constructor
      return
    }
    this.define(constructor.name, new ControllerMetadata(constructor))
  }
}

export class ControllerMetadata extends Metadata {
  constructor(public target: Function) {
    super()
  }
  getMessageMd(propertyName: string) {
    return this.get(propertyName) as MessageMetadata
  }
  setMessageMd(propertyName: string, ev: string) {
    const message = this.getMessageMd(propertyName)
    if (message) {
      message.ev = ev
      return
    }
    this.define(propertyName, new MessageMetadata(ev))
  }
}

export class MessageMetadata extends Metadata {
  parameters: ParameterMetadata[] = []
  constructor(public ev: string) {
    super()
  }

  setParameterMd(paramIndex: number, location: string[]) {
    this.parameters[paramIndex] = new ParameterMetadata(location)
  }
}

export class ParameterMetadata extends Metadata {
  constructor(public location: string[]) {
    super()
  }
}
