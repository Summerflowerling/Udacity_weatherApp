
let projectData = {};

const fetch = require('node-fetch')

// Require Express to run server and routes
const express = require('express')


// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8088;
const server = app.listen(port, listening)
//The listening argument refers to a callback function we create.
function listening(){
    console.log(`running on localhost: ${port}`)
}


//get method route

app.get('/getData', function (req, res) {
    console.log(res)
  res.send(projectData)
})



//post method route


app.post('/', function(req, res){
    let data = req.body
    projectData=
    {
        date: data.date,
        temp: data.temp,
        feeling:data.feeling,
        zip: data.zip,
        icon:data.icon
    } 
    res.send(projectData)
})

