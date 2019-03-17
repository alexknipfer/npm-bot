function buildPackageText(packages) {
  let text = ''

  packages.forEach(({ package, score }) => {
    text += '---------------------------------------\n'
    text += `*Name:* ${package.name}\n*Version:* ${
      package.version
    }\n*Description:* ${
      package.description
    }\n*Popularity:* ${getStarRatingFromPopularity(
      score.detail.popularity
    )}\n*NPM:* ${package.links.npm}\n*Repository:* ${
      package.links.repository
    }\n`
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

module.exports = {
  buildPackageText
}
