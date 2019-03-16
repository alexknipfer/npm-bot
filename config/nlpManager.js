const fs = require('fs')
const { NlpManager } = require('node-nlp')

const nlpManager = new NlpManager({ languages: ['en'] })

async function trainNlp() {
  if (fs.existsSync('./model.nlp')) {
    nlpManager.load('./model.nlp')
    return
  }

  nlpManager.addDocument(
    'en',
    'Search for a package called %packageName%',
    'search.package'
  )
  nlpManager.addDocument('en', 'Search for %packageName%', 'search.package')
  nlpManager.addDocument('en', 'Look for %packageName%', 'search.package')

  await nlpManager.train()
  await nlpManager.save()
}

module.exports = {
  nlpManager,
  trainNlp
}
