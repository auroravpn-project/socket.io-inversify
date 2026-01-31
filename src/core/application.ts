import { Container } from 'inversify'
import { Server as HTTPServer } from 'node:http'

import { loadMessage } from '../server/message-loader'
import { context } from './app-context'
import { Server, Socket } from 'socket.io'

export { Server, Socket }

export class InversifySocketIO {
  constructor(container: Container, server: HTTPServer) {
    context.initContext(container, server)
    loadMessage()
  }

  build() {
    return context.getIO()
  }

  to(socketId: string) {
    return context.getIO().to(socketId)
  }

  setMiddleware(
    handler: (socket: Socket, next: (err?: Error) => void) => void
  ) {
    context.getIO().use(handler)
  }
}
