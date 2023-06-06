const express=require('express')
const router=express.Router();

//routes

router.get('/',(req,res)=>{
    const data={
        title:'nodejs',
        description:'blog website using node,express and mongodb'
    }

    res.render('home',{data}  )
})

router.get('/about',(req,res)=>{
    res.render('about')
})

module.exports=router