const axios = require('axios')

const baseUrl = 'https://api.npms.io/v2'

const npmService = {
  searchPackages: async (searchString, size = 5) => {
    try {
      const packages = await axios.get(
        `${baseUrl}/search?q=${searchString}+not:deprecated,insecure&size=${size}`
      )
      return packages
    } catch (err) {
      console.log('Error searching packages', err)
    }
  }
}

module.exports = npmService
