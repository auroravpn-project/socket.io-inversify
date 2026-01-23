import { Container } from 'inversify'
import { Controller, InversifySocketIO, Message, Socket } from '../../src'
import { createServer } from 'node:http'
import { Socket as TypedScoket } from 'socket.io'

const container = new Container()
const server = createServer((req, res) => {
  res.end('hello')
})

const app = new InversifySocketIO(container, server)

@Controller()
class TestController {
  @Message('sayHi')
  sayHi(@Socket() socket: TypedScoket, arg1: any) {
    // throw new Error('Error')
    console.log(arg1)
    socket.emit('sayHi', 'Hi')
  }
}

container.bind(TestController).toSelf()

app.listen({ port: 3000, host: '0.0.0.0' }, () => {
  console.log('running')
})
