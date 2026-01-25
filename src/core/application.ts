import { Container } from 'inversify'
import { Server as HTTPServer } from 'node:http'
import { Server as IOServer, Socket as IOSocket } from 'socket.io'

import { loadMessage } from '../server/message-loader'
import { context } from './app-context'

export { IOServer, IOSocket }

export class InversifySocketIO {
  constructor(container: Container, server: HTTPServer) {
    context.initContext(container, server)
    loadMessage()
  }

  build(): IOServer {
    return context.getIO()
  }
}
