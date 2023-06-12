const express=require('express')
const router=express.Router();
const post=require('../models/post')
const user=require('../models/user')

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

router.post('/admin',async(req,res)=>{
    const {username,password}=req.body
    console.log(req.body)
    res.redirect('/admin')
})

module.exports=router