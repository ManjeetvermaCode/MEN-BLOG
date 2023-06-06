const mongoose=require('mongoose')
const schema=mongoose.Schema;

const postschema=new schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    updatedOn:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Post',postschema)