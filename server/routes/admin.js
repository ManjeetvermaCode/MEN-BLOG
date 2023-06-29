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
router.get('/admin',async(req,res,next)=>{
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
            return res.status(401).json({messages:'invalid credentials'})
        }
        const ispssvalid=await bcrypt.compare(password,user.password)
        if(ispssvalid){
            req.session.user_id=user._id
            req.flash('success','WELCOME')
           return res.redirect('/dashboard')
        }
        else{
            res.status('401').json({message:'invalid credentials'})
        }
     
    })


//admin->login->dashboard

router.get('/dashboard',isvalid,async(req,res)=>{
    try {
      const locals={
        title:'Admin DashBoard'
      }  
      const data=await post.find({})
       res.render('admin/dashboard',{locals,data,layout:layout})
    } catch (error) {
        res.status(201).json({message:'something wrong'})
    }

})


router.post('/logout',(req,res)=>{
    req.session.user_id=null
  req.flash('error','Logged out successfuly')
 res.redirect('/')
})

//get->create-post

router.get('/add-post',isvalid,(req,res)=>{
    try {
        const locals={
            title:'New Post'
        }
    res.render('admin/create-post',{locals,layout:layout})

    } catch (error) {
        res.status(201).json({message:'something wrong'})
 
    }
})

//post->create-post

router.post('/add-post',isvalid,async(req,res)=>{
    try {
      const c=new post({
        title:req.body.title,
        body:req.body.body
      })
      await post.create(c)//creating new blog
      req.flash('success','successfully created the blog')

      res.redirect('/dashboard')
    } catch (error) {
        res.status(201).json({message:'Enter valid article.'})
    }
})
//put-edit post
router.put('/post/edit-post/:id',isvalid,async(req,res)=>{
    const {id}=req.params
    try {
        await post.findByIdAndUpdate(id,{
            title:req.body.title,
            body:req.body.body,
            Updatedon:Date.now()
        })
        res.redirect(`/post/${id}`)
    } catch (error) {
        res.status(201).json({message:'Do not leave the field empty.'})

    }
})

/*
var htmlContent = '<p><strong>we are testing tiny toolkit.&nbsp;<span style="text-decoration: underline;">this sentence must be underlined.</span></strong></p>';

var tempDiv = document.createElement('div');
tempDiv.innerHTML = htmlContent;

var plainText = tempDiv.textContent || tempDiv.innerText || '';

console.log(plainText);

*/


//get-edit post
router.get('/post/:id/edit-post',isvalid,async(req,res)=>{
    const {id}=req.params
    try {
        const locals={
            title:'Edit Post Page'
        }
    const data=await post.findById(id)
    res.render('admin/edit-post',{locals,layout:layout,data})

    } catch (error) {
        res.status(201).json({message:'something wrong'})
    }
})



//delete-delete post

router.delete('/delete-post/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await post.findByIdAndDelete(id)
        req.flash('success',"SUCCESSFULLY DELETED THE BLOG")
        res.redirect('/dashboard')
    } catch (error) {
        res.status(201).json({message:'failed to delete the blog.'})

    }
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