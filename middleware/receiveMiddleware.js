const nlpManager = require('../config/nlpManager')

module.exports = function(controller, nlpManager) {
  controller.middleware.receive.use(async function(bot, message, next) {
    const result = await nlpManager.process(message.text)
    message.intent = result.intent
    message.entities = result.entities

    next()
  })
}
