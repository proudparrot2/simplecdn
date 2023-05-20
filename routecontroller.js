const routes = {
  github: require("./routes/github.js"),
  bitbucket: require("./routes/bitbucket.js"),
  codeberg: require("./routes/codeberg.js"),
  npm: require("./routes/npm.js")
}

module.exports = { routes }