const { nlpManager } = require('../config/nlpManager')
const { nerManager } = require('../config/nerManager')

module.exports = function(controller) {
  controller.middleware.receive.use(async function(bot, message, next) {
    const result = await nlpManager.process(message.text)
    const entities = await nerManager.findEntities(message.text, 'en')

    message.intent = result.intent
    message.entities = entities

    next()
  })
}
