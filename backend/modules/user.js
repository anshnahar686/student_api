const mongoose=require('mongoose')
const user=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
    },
     password:{
        type:String,
        minLength:[3,'miniumn length'],
        trim:true,
    },
     email:{
        type:String,
        unique:true,
        trim:true,
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model('user',user)