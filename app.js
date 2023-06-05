require('dotenv').config();

const express=require('express')
const app=express();
const expresslayouts=require('express-ejs-layouts')

app.use(express.static('public'))//serving assets

const PORT=5000 || process.env.PORT

//templating engine
app.use(expresslayouts)
app.set('layout','./layouts/main')
app.set('view engine','ejs')

app.use('/',require('./server/routes/main'))


app.listen(PORT,()=>{
    console.log(`The app is hosted on port ${PORT}`)
})