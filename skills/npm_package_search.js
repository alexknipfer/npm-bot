const npmService = require('../services/npmService')
const nlpHearsMiddleware = require('../middleware/nlpHearsMiddleware')
const getSizes = require('package-size')
const { getEntityFromMessage } = require('../utils/entityUtils')
const { buildPackageText } = require('../utils/slackMessageUtils')

module.exports = function(controller, nlpManager) {
  controller.hears(
    ['search.package'],
    'direct_message,direct_mention',
    nlpHearsMiddleware,
    function(bot, message) {
      bot.createConversation(message, async function(err, convo) {
        if (err) {
          console.log('Error starging convo: ', err)
        }

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

        const packagesWithSizes = await Promise.all(
          results.map(async result => {
            try {
              const sizes = await getSizes(result.package.name)

              return {
                ...result.package,
                ...result.score,
                sizes
              }
            } catch (err) {
              console.log(
                `Could not get sizes for ${result.package.name}: `,
                err
              )

              return {
                ...result.package,
                ...result.score
              }
            }
          })
        ).catch(err => console.log('Error getting package sizes: ', err))

        const text = buildPackageText(packagesWithSizes)

        convo.addMessage({ text }, 'default')
        convo.activate()
      })
    }
  )
}
