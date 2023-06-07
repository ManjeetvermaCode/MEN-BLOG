require('dotenv').config();
const PORT=5000 || process.env.PORT


const express=require('express')
const app=express();
const expresslayouts=require('express-ejs-layouts')//allow us to use layout template as ejs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/men-blog', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
})


app.use(express.static('public'))//serving assets


//templating engine
app.use(expresslayouts)//using expresslayouts as a middleware
app.set('layout','./layouts/main')//setting main.ejs page as only rendering page.
app.set('view engine','ejs')//setting view engine to ejs


app.use('/',require('./server/routes/main'))


app.listen(PORT,()=>{
    console.log(`The app is hosted on port ${PORT}`)
})