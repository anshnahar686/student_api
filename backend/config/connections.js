const mongoose=require('mongoose')
const connections=()=>{
    
    mongoose.connect(process.env.CONNECTION).then((res)=>{
        
        console.log("Database is connected")
    }).catch((error)=>{
        console.log(error)
    })
    
}
module.exports=connections;