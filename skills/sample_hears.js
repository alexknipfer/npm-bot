const nlpHearsMiddleware = require('../middleware/nlpHearsMiddleware')

module.exports = function(controller, nlpManager) {
  var stats = {
    triggers: 0,
    convos: 0
  }

  controller.on('heard_trigger', function() {
    stats.triggers++
  })

  controller.on('conversationStarted', function() {
    stats.convos++
  })

  controller.hears(
    ['search.package'],
    'direct_message,direct_mention',
    nlpHearsMiddleware,
    function(bot, message) {
      bot.createConversation(message, async function(err, convo) {
        if (!err) {
          // console.log('MESSAGE: ', message)
          // const result = await nlpManager.process()
          // convo.setVar("uptime", formatUptime(process.uptime()));
          // convo.setVar("convos", stats.convos);
          // convo.setVar("triggers", stats.triggers);
          // convo.say(
          //   "My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations."
          // );
          // convo.activate();
        }
      })
    }
  )

  /* Utility function to format uptime */
  function formatUptime(uptime) {
    var unit = 'second'
    if (uptime > 60) {
      uptime = uptime / 60
      unit = 'minute'
    }
    if (uptime > 60) {
      uptime = uptime / 60
      unit = 'hour'
    }
    if (uptime != 1) {
      unit = unit + 's'
    }

    uptime = parseInt(uptime) + ' ' + unit
    return uptime
  }
}
