const npmService = require('../services/npmService')
const nlpHearsMiddleware = require('../middleware/nlpHearsMiddleware')
const { getEntityFromMessage } = require('../utils/entityUtils')
const { buildPackageText } = require('../utils/slackMessageUtils')

module.exports = function(controller, nlpManager) {
  controller.hears(
    ['search.package'],
    'direct_message,direct_mention',
    nlpHearsMiddleware,
    async function(bot, message) {
      if (!message.entities.length) {
        bot.reply(
          message,
          'I was not unable to identify which package you were looking for'
        )
      }

      const messageEntity = getEntityFromMessage(message)
      const {
        data: { results }
      } = await npmService.searchPackages(messageEntity.sourceText)

      const messageText = buildPackageText(results)

      bot.reply(message, messageText)
    }
  )
}
