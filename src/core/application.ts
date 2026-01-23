import { Container } from 'inversify'
import { Server } from 'node:http'
import { loadMessage } from 'src/server/message-loader'
import { context } from './app-context'

export class InversifySocketIO {
  constructor(container: Container, server: Server) {
    context.initContext(container, server)
  }

  listen(opts?: { port?: number; host?: string }, callback?: () => void) {
    loadMessage()
    const server = context.getServer()
    if (opts) {
      server.listen(opts.port, opts.host)
      callback?.()
      return
    }
    server.listen()
  }
}
