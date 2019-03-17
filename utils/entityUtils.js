function getEntityFromMessage(message) {
  // return Math.max.apply(Math, message.entities.map(o => o.accuracy))
  return message.entities.reduce((prev, current) =>
    prev.accuracy > current.accuracy ? prev : current
  )
}

module.exports = {
  getEntityFromMessage
}
