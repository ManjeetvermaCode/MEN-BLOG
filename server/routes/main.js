const express=require('express')
const router=express.Router();
const post=require('../models/post')
//routes

router.get('/',async(req,res)=>{
    try {
        const data=await post.find();
        //console.log(data)
        res.render('home',{data})
    } catch (error) {
        console.log('something went wrong')
        console.log(error)
    }

})




router.get('/about',(req,res)=>{
    res.render('about')
})





/*
function testdata(){
    post.insertMany([
        {
            title:'first title of the blog',
            body:'Body of first blog'
        },
        {
            title:'second title of the blog',
            body:'Body of second blog' 
        },
        {
            title:'third title of the blog',
            body:'Body of third blog'
        }
    ])
}
testdata()
*/

module.exports=router