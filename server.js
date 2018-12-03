const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const logger = require("morgan")

//activating express 
let app = express();
//setting the port to environmental port for heroku deployment or 3000
const PORT = process.env.PORT || 3000;

//middleware parsing body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//use morgan logger for logging request 
app.use(logger("dev"));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// hosted mongo db info 
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//connecting to the database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


//engine running handlebars setting the default layout to main.handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
//connecting to server and logging that it is working
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});