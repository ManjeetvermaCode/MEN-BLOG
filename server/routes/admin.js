const express=require('express')
const router=express.Router();
const post=require('../models/post')
const newuser=require('../models/user')
const bcrypt=require('bcrypt')

const layout=('../views/layouts/admin')//receiving admin layout

//middleware
const isvalid=((req,res,next)=>{
    if(!req.session.user_id){
     return res.redirect('/admin')
    }
    next()
})


//admin->login page
router.get('/admin',async(req,res)=>{
    try {
        const locals={
            title:'Admin Page'
        }
        res.render('admin/index',{locals,layout:layout})//passing admin layout
    } catch (error) {
        console.log(error)
    }
})

//admin-login route

router.post('/login',async(req,res)=>{
        const {username,password}=req.body
        const user=await newuser.findOne({username})

        if(!user){
            return res.status(401).json({message:'invalid credentials'})
        }
        const ispssvalid=await bcrypt.compare(password,user.password)
        if(ispssvalid){
            req.session.user_id=user._id
            res.redirect('/dashboard')
        }
        else{
            res.status('401').json({message:'invalid credentials'})
        }
     
    })


//admin->login->dashboard

router.get('/dashboard',isvalid,(req,res)=>{
    res.render('admin/dashboard')
})


router.post('/logout',(req,res)=>{
    req.session.user_id=null
    return res.redirect('/')
})

// router.post('/admin',async(req,res)=>{
//     const {username,password}=req.body
//     console.log(req.body)
//     res.redirect('/admin')
// })

//admin-register route
// router.post('/register',async(req,res)=>{
//    try {
//     const {username,password}=req.body
//     const hashed_pass=await bcrypt.hash(password,10)//10 is salt here
//     try {
//         const User=await newuser.create({username,password:hashed_pass})
//         req.session.user_id=User._id;
//         res.status(201).json({message:'user created',User})
//     } catch (error) {
//         if(error.code===11000){
//             res.status(409).json({message:'Please enter valid credentials'})
//         }
//         res.status(500).json({message:'internal server error'})
//     }
//    } catch (error) {
//     console.log(error)
//    }
// })


module.exports=router