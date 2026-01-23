import { Container } from 'inversify'
import { Server as HTTPServer } from 'node:http'
import { AppCtxNotInitializedError } from './errors/app-ctx-not-ini.error'
import { Server } from 'socket.io'
import { createIO } from '../server/socketio-instance'

class AppContext {
  container: Container | null = null
  server: HTTPServer | null = null
  io: Server | null = null

  initContext(container: Container, server: HTTPServer) {
    this.container = container
    this.server = server
    this.io = createIO(server)
  }

  getContainer() {
    if (this.container) {
      return this.container
    }
    throw new AppCtxNotInitializedError('Context is not initialized')
  }

  getServer() {
    if (this.server) {
      return this.server
    }
    throw new AppCtxNotInitializedError('Context is not initialized')
  }

  getIO() {
    if (this.io) {
      return this.io
    }
    throw new AppCtxNotInitializedError('Context is not initialized')
  }
}

export const context = new AppContext()
