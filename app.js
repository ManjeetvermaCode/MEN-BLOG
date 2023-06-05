require('dotenv').config();

const express=require('express')
const app=express();
const expresslayouts=require('express-ejs-layouts')//allow us to use layout template as ejs

app.use(express.static('public'))//serving assets

const PORT=5000 || process.env.PORT

//templating engine
app.use(expresslayouts)//using expresslayouts as a middleware
app.set('layout','./layouts/main')//setting main.ejs page as only rendering page.
app.set('view engine','ejs')//setting view engine to ejs

app.use('/',require('./server/routes/main'))


app.listen(PORT,()=>{
    console.log(`The app is hosted on port ${PORT}`)
})