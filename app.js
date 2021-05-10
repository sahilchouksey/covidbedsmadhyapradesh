const express = require("express");

const appController = require("./controllers/controller");

const app = express();

// set up template engine
app.set('view engine', 'ejs');


// statc file
app.use(express.static('./public'))


appController(app)

// listen to port 
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App is listing to port ${port}`);

