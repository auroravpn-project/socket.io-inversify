import { ControllerMetadata, MessageMetadata } from '../metadata/metadata'
import { storage } from '../metadata/metadata-storage'
import { context } from '../core/app-context'
import { resolve } from '../core/resolver'

export function loadMessage() {
  storage.metadata.each<ControllerMetadata>((ctrlMd) => {
    ctrlMd.each<MessageMetadata>((msgMd, propertyName) => {
      context.getIO().on('connection', (socket) => {
        socket.on(msgMd.ev, async (...args) => {
          // 获取参数内容
          const result = []
          let argIndex = 0
          // msgMd.parameters:[undefined, { ParamMd }, undefined, undefined]
          msgMd.parameters.forEach((parameter, paramIndex) => {
            if (!parameter && argIndex < args.length) {
              result.push(args[argIndex])
              argIndex++
            } else {
              if (parameter.location[0] === 'socket') {
                result.push(socket)
              }
            }
          })
          while (argIndex < args.length) {
            result.push(args[argIndex])
            argIndex++
          }
          // 注入参数, 执行方法
          try {
            const res: { ev: string; data: object } = await resolve(
              ctrlMd.target
            )[propertyName](...result)
            if (res) {
              if (res.ev && res.data) {
                socket.emit(res.ev, res.data)
              } else if (res.ev && !res.data) {
                socket.emit(res.ev)
              } else {
              }
            }
          } catch (err) {
            console.error(err)
          }
        })
      })
    })
  })
}
