const fs = require('fs')

module.exports = async function trainNlp(manager) {
  if (fs.existsSync('./model.nlp')) {
    manager.load('./model.nlp')
    return
  }

  manager.addDocument('en', 'My mail is %email%', 'email')
  manager.addDocument('en', 'My email is %email%', 'email')
  manager.addAnswer('en', 'email', 'Your email is {{email}}')

  await manager.train()
  await manager.save()
}
