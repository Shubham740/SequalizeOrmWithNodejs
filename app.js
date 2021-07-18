const  express = require('express');
const cors = require("cors");
var bodyParser = require('body-parser');
var AddServices =require('./services').AddServices;

const sequelize = require('./connection')
const database=require('./database')

const app= express();
const port = 8084;


  
  app.use(cors());
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended:true}))

new AddServices(app)


app.listen(port,()=>{
    console.log("App is listening at http://localhost:"+port);
})