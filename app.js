require('dotenv').config();
const PORT=5000 || process.env.PORT


const express=require('express')
const app=express();
const expresslayouts=require('express-ejs-layouts')//allow us to use layout template as ejs
const methodoverride=require('method-override')
const path=require('path')
const session=require('express-session')
const flash=require('connect-flash')
const dotenv=require('dotenv')

dotenv.config()

const {isActive}=require('./server/helpers/routehelpers')

const mongoose = require('mongoose');
mongoose.connect((process.env.MONGO_URI), { 
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


app.use(express.static(path.join(__dirname, "public")));

//templating engine
app.use(expresslayouts)//using expresslayouts as a middleware
app.use(methodoverride('_method'))
app.set('layout','./layouts/main')//setting main.ejs page as only rendering page.
app.set('view engine','ejs')//setting view engine to ejs

app.use((req,res,next)=>{
    res.locals.path=req.path
    res.locals.isActiveRoute=isActive

    next()
})


//for enabling post method
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//session and cookies
app.use(session({
    secret:'probablyagoodpassword',
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        expires:Date.now()*1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }

}))
app.use(flash())


app.use((req,res,next)=>{
    res.locals.success=req.flash('success')
    res.locals.edit=req.flash('edit')
    next()
})   


app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))

app.listen(PORT,()=>{
    console.log(`The app is hosted on port ${PORT}`)
})