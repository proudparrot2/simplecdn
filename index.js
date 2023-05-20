// Packages
const express = require('express');
const mime = require('mime-types');
const cache = require('memory-cache');
const ejs = require('ejs')

// Express stuff
const app = express();
app.set('view engine', 'ejs')
const port = process.env.PORT || 3000;

// Route manager
const { routes } = require("./routecontroller.js")

app.get('/', (req, res) => res.render('index'))
app.get('/cdn/:username/:repository/:branch/*', routes.github);
app.get('/bit/:username/:repository/:commit/*', routes.bitbucket);
app.get('/cb/:username/:repository/:branch/*', routes.codeberg);
app.get('/npm/:package@:version/*', routes.npm);

// Start server
app.listen(port, () => {
  console.log(`Now running on port ${port}`);
});
