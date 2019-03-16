const { NlpManager } = require('node-nlp')

const nlpManager = new NlpManager({ languages: ['en'] })

async function trainNlp() {
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
