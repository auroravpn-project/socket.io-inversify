# Socket.IO-Inversify

## 安装

```bash
npm install @auroravpn/socket.io-inversify
yarn add @auroravpn/socket.io-inversify
pnpm add @auroravpn/socket.io-inversify
```

## 快速入门

```typescript
import { Container } from 'inversify'
import { InversifySocketIO, Controller, Message, Socket } from '@auroravpn/socket.io-inversify'
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
    console.log(arg1)
    socket.emit('sayHi', 'Hi')
  }
}

container.bind(TestController).toSelf()

app.listen({ port: 3000, host: '0.0.0.0' }, () => {
  console.log('running')
})

```

## API 参考

### 构造函数

#### `new InversifySocketIO(container, server)`

**参数**

- `container` `Inversify.Container` **必填,** Inversify容器
- `server` `node:http.Server` **必填,** Http服务器

**示例**

```typescript
import { Container } from 'inversify'
import { InversifySocketIO } from '@auroravpn/socket.io-inversify'
import { createServer } from 'node:http'

const container = new Container()
const server = createServer()
const app = new InversifySocketIO(container, server)
```

### 实例方法

#### `InversifySocketIO.listen([opts], [callback])`

**参数：**

- `opts` (object): 配置对象
  - `host` (string): IP地址
  - `port` (number): 端口

**返回值：** (void)

**示例：**

```typescript
app.listen({ port: 3000, host: 'localhost' }, () => {
    console.log('App is running at http://localhost:3000/')
})
```

### 装饰器

#### 类装饰器

##### `@Controller()`

**示例**

```typescript
@Controller()
class TestController {}
```

#### 方法装饰器

##### `@Message(ev)`

**参数**

- `ev` `string` **必填,** SocketIO事件

**示例**

```bash
@Controller()
class TestController {
  @Message('sayHi')
  sayHi(arg1: any) {
    console.log(arg1)
  }
}
```



#### 参数装饰器

##### `@Socket()`

**示例**

```typescript
@Controller()
class TestController {
  @Message('sayHi')
  sayHi(@Socket() socket: TypedScoket, arg1: any) {
    console.log(arg1)
    socket.emit('sayHi', 'Hi')
  }
}
```

