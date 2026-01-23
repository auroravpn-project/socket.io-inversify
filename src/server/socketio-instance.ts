import { Server } from 'socket.io'
import { Server as HTTPServer } from 'node:http'

export function createIO(server: HTTPServer) {
  return new Server(server)
}
