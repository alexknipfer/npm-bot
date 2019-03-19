function buildPackageText(packages) {
  let text = ''

  packages.forEach(package => {
    text += '---------------------------------------\n'
    text += `*Name:* ${package.name}\n*Version:* ${
      package.version
    }\n*Description:* ${
      package.description
    }\n*Popularity:* ${getStarRatingFromPopularity(
      package.detail.popularity
    )}\n*NPM:* ${package.links.npm}\n*Repository:* ${
      package.links.repository
    }\n`

    if (package.sizes) {
      text += `*Bundle Size:* SIZE - ${convertFromByteToKilobyte(
        package.sizes.size
      )} kB | MINIFIED - ${convertFromByteToKilobyte(
        package.sizes.minified
      )} kB | GZIPPED - ${convertFromByteToKilobyte(
        package.sizes.gzipped
      )} kB\n`
    }
  })

  return text
}

function getStarRatingFromPopularity(popularity) {
  if (parseFloat(popularity) > parseFloat(0.8)) {
    return `:star::star::star::star::star:`
  } else if (parseFloat(popularity) > parseFloat(0.5)) {
    return `:star::star::star::star:`
  } else if (parseFloat(popularity) > parseFloat(0.3)) {
    return `:star::star::star:`
  } else if (parseFloat(popularity) > parseFloat(0.1)) {
    return `:star::star:`
  } else {
    return `:star:`
  }
}

function convertFromByteToKilobyte(byteSize) {
  return (parseFloat(byteSize) * 0.001).toFixed(1)
}

module.exports = {
  buildPackageText
}
