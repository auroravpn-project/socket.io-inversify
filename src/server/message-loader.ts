import { ControllerMetadata, MessageMetadata } from '../metadata/metadata'
import { storage } from '../metadata/metadata-storage'
import { context } from '../core/app-context'
import { resolve } from '../core/resolver'

export function loadMessage() {
  context.getIO().on('connection', (socket) => {
    storage.metadata.each<ControllerMetadata>((ctrlMd) => {
      ctrlMd.each<MessageMetadata>(async (msgMd, propertyName) => {
        if (msgMd.ev === 'connect') {
          const result: any[] = []
          msgMd.parameters.forEach((parameter, paramIndex) => {
            if (parameter && parameter.location[0] === 'socket') {
              result[paramIndex] = socket
            }
          })
          try {
            await resolve(ctrlMd.target)[propertyName](...result)
          } catch (err) {
            console.error(err)
          }
          return
        }
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
            const res = await resolve(ctrlMd.target)[propertyName](...result)
            res && socket.emit(msgMd.ev, res)
          } catch (err) {
            console.error(err)
          }
        })
      })
    })
  })
}
