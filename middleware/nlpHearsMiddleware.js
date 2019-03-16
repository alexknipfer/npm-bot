module.exports = function(patterns, message) {
  return patterns.some(pattern => {
    if (message.intent === pattern) {
      console.log('NLP Matched Intent!', message.intent, pattern)
      return true
    }
  })
}
