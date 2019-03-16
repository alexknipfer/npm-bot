const { NerManager } = require('node-nlp')

const nerManager = new NerManager({ threshold: 0.8 })

async function addEntities() {
  const packageNameEntity = nerManager.addNamedEntity('packageName', 'trim')
  packageNameEntity.addAfterCondition('en', 'for')
}

module.exports = {
  nerManager,
  addEntities
}
