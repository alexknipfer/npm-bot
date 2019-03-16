const fs = require('fs')
const jsYaml = require('js-yaml')

module.exports = async function trainNlp(manager) {
  // if (fs.existsSync('./model.nlp')) {
  //   manager.load('./model.nlp')
  //   return
  // }

  const packageNameEntity = manager.addTrimEntity('packageName')
  packageNameEntity.addAfterCondition('en', 'Search for ')
  // manager.slotManager.addSlot('search.package', 'packageName', true, {})

  manager.addDocument(
    'en',
    'Search for a package called %packageName%',
    'search.package'
  )
  manager.addDocument('en', 'Search for %packageName%', 'search.package')
  manager.addDocument('en', 'Look for %packageName%', 'search.package')
  manager.addAnswer(
    'en',
    'search.package',
    'Your package name is {{packageName}}'
  )

  await manager.train()
  await manager.save()
}
