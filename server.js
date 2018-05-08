var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


app.get('/', (req,res) => {
    res.json({"message": "My first express API"});
});


require('./app/routes/note.routes.js')(app);
app.listen(4000 , function() {
console.log("server is listening");
});