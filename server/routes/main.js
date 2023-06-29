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
        currentroute:'/',
        current:page,
        nextPage:hasNextPage ? nextPage:null,
    })
    } catch (error) {
        console.log('something went wrong')
        console.log(error)
    }

})

// router.post('/search',async(req,res)=>{
//     try {
//         const locals={
//             title:'Results'
            
//         }
//     let {searchterm}=req.body;
//     const SearchnospecialChar=searchterm.replace(/[^a-zA-Z0-9]/g,"")
    
//     const data=await post.find({
//         $or:[
//             {title:{$regex: new RegExp(SearchnospecialChar,'i')}},
//             {body:{$regex:new RegExp(SearchnospecialChar,'i')}}
//         ]
//     })//search logic in mongodb
//         res.render("search",{data})
//     } catch (error) {
//         console.log('something went wrong')
//         console.log(error) 
//     }

// })


router.get('/post/:id',async(req,res)=>{
    try {
       
        const {id}=req.params
        const p=await post.findById(id)
        const locals={
            title:p.title
        }
        res.render('post',{p,locals,currentroute:`/post/${id}`})
    } catch (error) {
        console.log(error)
    }
})



router.get('/about',(req,res)=>{
   res.render('about',{currentroute:'/about'})
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