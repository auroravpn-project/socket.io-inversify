import { Container } from 'inversify'
import { Server } from 'node:http'
import { loadMessage } from 'src/server/message-loader'
import { context } from './app-context'

export class InversifySocketIO {
  constructor(container: Container, server: Server) {
    context.initContext(container, server)
    loadMessage()
  }

  build() {
    return context.getIO()
  }
}
