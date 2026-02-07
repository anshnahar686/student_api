const mongoose=require('mongoose')
const paginate=require('mongoose-paginate-v2')
const student=new mongoose.Schema({
    first_name:{
        type:String,
        trim:true,
        required:true,

    },
    last_name:{
         type:String,
        trim:true,
        required:true, 
    },
    email:{
         type:String,
        trim:true,
        required:true,
        unique:true,

    },
    age:{
        type:String,

    },
    phone:{
        type:String,

    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    profile_pic: {
        type: String
    }
})
student.plugin(paginate)
module.exports=mongoose.model('Students',student)