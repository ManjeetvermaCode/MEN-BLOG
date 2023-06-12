const express=require('express')
const router=express.Router();
const post=require('../models/post')
const newuser=require('../models/user')

const layout=('../views/layouts/admin')//receiving admin layout

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
        if(!ispssvalid){
            res.status('401').json({message:'invalid credentials'})
        }

        //const token=jwt.sign({userId:user._id},jwtsecret)
       // res.cookie('token',token,{httpOnly:true})
        res.redirect('/dashboard')
    })


//admin->login->dashboard

router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard')
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