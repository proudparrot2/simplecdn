// Express stuff
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const port = process.env.PORT || 3000;

// Route manager
const { routes } = require("./utils/routecontroller.js")

app.get('/', (req, res) => res.render('index'))
app.get('/cdn/:username/:repository/:branch/*', routes.github);
app.get('/bit/:username/:repository/:commit/*', routes.bitbucket);
app.get('/cb/:username/:repository/:branch/*', routes.codeberg);
app.get('/npm/:package@:version/*', routes.npm);

// Start server
app.listen(port, () => {
  console.log(`Now running on port ${port}`);
});
