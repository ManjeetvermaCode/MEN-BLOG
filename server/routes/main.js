const express=require('express')
const router=express.Router();
const post=require('../models/post')
//routes

router.get('/',async(req,res)=>{
    const locals={
        title:'Home Page'
    }
    try {
        let perPage=7;
        let page=req.query.page || 1;

        const data=await post.aggregate([{$sort:{createdOn:-1}}])
        .skip(perPage*page-perPage)
        .limit(perPage)
        .exec()

        const count=await post.count()
        const nextPage=parseInt(page)+1;
        const hasNextPage=nextPage<=Math.ceil(count/perPage)
        
        res.render('home',{locals,
        data,
        current:page,
        nextPage:hasNextPage ? nextPage:null
    })
    } catch (error) {
        console.log('something went wrong')
        console.log(error)
    }

})
/*
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
*/

router.get('/post/:id',async(req,res)=>{
    try {
       
        const {id}=req.params
        const p=await post.findById(id)
        const locals={
            title:p.title
        }
        res.render('post',{p,locals})
    } catch (error) {
        console.log(error)
    }
})



router.get('/about',(req,res)=>{
   res.render('about')
})






function testdata(){
    post.insertMany([
        {
            title:'fourth blog',
            body:'this is the body'
        },
        {
            title:'making money in 5 minutes',
            body:'start begging'
        },
        {
            title:'html in 10 hours',
            body:'<h1>This is the heading tag</h1>'
        },
        {
            title:'nodejs full tutorial',
            body:'nodejs tutorial'
        }
    ])
}
//testdata()


module.exports=router