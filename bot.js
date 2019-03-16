const env = require('node-env-file')
env(__dirname + '/.env')

if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  usage_tip()
}

const Botkit = require('botkit')
const debug = require('debug')('botkit:main')
const { nlpManager, trainNlp } = require('./config/nlpManager')
const { addEntities } = require('./config/nerManager')

var bot_options = {
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  clientSigningSecret: process.env.clientSigningSecret,
  // debug: true,
  scopes: ['bot'],
  studio_token: process.env.studio_token,
  studio_command_uri: process.env.studio_command_uri
}

if (process.env.MONGO_URI) {
  var mongoStorage = require('botkit-storage-mongo')({
    mongoUri: process.env.MONGO_URI
  })
  bot_options.storage = mongoStorage
} else {
  bot_options.json_file_store = __dirname + '/.data/db/' // store user data in a simple JSON format
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(bot_options)

controller.startTicking()

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(
  controller
)

webserver.get('/', function(req, res) {
  res.render('index', {
    domain: req.get('host'),
    protocol: req.protocol,
    glitch_domain: process.env.PROJECT_DOMAIN,
    layout: 'layouts/default'
  })
})
;(async function() {
  addEntities()
  await trainNlp(nlpManager)

  require(__dirname + '/middleware/receiveMiddleware')(controller, nlpManager)
  require(__dirname + '/components/user_registration.js')(controller)
  require(__dirname + '/components/onboarding.js')(controller)

  const normalizedPath = require('path').join(__dirname, 'skills')
  require('fs')
    .readdirSync(normalizedPath)
    .forEach(function(file) {
      require('./skills/' + file)(controller, nlpManager)
    })
})()

function usage_tip() {
  console.log('~~~~~~~~~~')
  console.log('Botkit Starter Kit')
  console.log('Execute your bot application like this:')
  console.log(
    'clientId=<MY SLACK CLIENT ID> clientSecret=<MY CLIENT SECRET> PORT=3000 node bot.js'
  )
  console.log('Get Slack app credentials here: https://api.slack.com/apps')
  console.log('~~~~~~~~~~')
}
