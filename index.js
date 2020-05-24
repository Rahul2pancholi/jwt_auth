const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
//import routes
const awthRoute = require('./routes/auth');
const postRoute = require('./routes/posts');



dotenv.config();

//connect to db

mongoose.connect(process.env.DB_CONNECT,
{ useUnifiedTopology: true,useNewUrlParser: true  },
() => console.log("connect to db "))


//middleware
app.use(express.json());

//route middleware
app.use('/api/user',awthRoute);
app.use('/api/posts',postRoute)

app.listen(3000,() => console.log("server is running") )