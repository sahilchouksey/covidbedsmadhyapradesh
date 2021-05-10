const express = require("express");

const appController = require("./controllers/controller");

const app = express();

// set up template engine
app.set('view engine', 'ejs');


// statc file
app.use(express.static('./public'))


appController(app)

// listen to port 
app.listen(6960);
console.log('App is listing to port 6960');

