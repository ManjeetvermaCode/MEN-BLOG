const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const messageSchema=Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    sub:{
        required:true,
        type:String
    },
    msg:{
        required:true,
        type:String
    },
})

const message=new mongoose.model('Message',messageSchema)

module.exports=message