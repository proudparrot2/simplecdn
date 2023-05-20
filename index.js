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

// Route manager
const { routes } = require("./routecontroller.js")

app.get('/', (req, res) => res.render('index'))
app.get('/cdn/:username/:repository/:branch/*', routes.github);
app.get('/bit/:username/:repository/:commit/*', routes.bitbucket);
app.get('/cb/:username/:repository/:branch/*', routes.codeberg);
app.get('/npm/:package@:version/*', routes.npm);5

app.listen(port, () => {
  console.log(`Now running on port ${port}`);
});
