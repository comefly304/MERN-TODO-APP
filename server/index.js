const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Connection=require('./config/db')
const cors = require('cors');

const app = express();
//use express.json() to get data into json format
app.use(express.json());
//Port 
const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());

//import routes
const TodoItemRoute = require('./routes/todoItems');


//connect to mongodb ..



app.use('/', TodoItemRoute);



//connect to server
app.listen(PORT,()=>{
    Connection()
    console.log('server connectedd')
})
