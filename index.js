const express = require('express');
const request = require('request');
const path = require("path");

const mime = require('mime-types');
const cache = require('memory-cache');
const ejs = require('ejs')

const app = express();
const port = 3000;
const cacheDuration = 60 * 1000;

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'build')))

var githubRoute = require("./routes/github.js")
var bitbucketRoute = require("./routes/bitbucket.js")
var npmRoute = require("./routes/npm.js")

app.get('/gh/:username/:repository/:branch/*', githubRoute);
app.get('/bit/:username/:repository/:commit/*', bitbucketRoute);
app.get('/npm/:package@:version/*', npmRoute);

app.listen(port, () => {
  console.log(`Now running on port ${port}`);
});
