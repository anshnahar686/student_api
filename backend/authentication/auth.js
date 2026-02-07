const jwt=require('jsonwebtoken')
exports.Authenticate=(req,res,next)=>{
    try {
        // console.log(req.headers['authorization'])
        const bearerHeader=req.headers['authorization']
        // console.log(bearerHeader)
        if(typeof bearerHeader !='undefined') 
           
            {
                 console.log("sdfs")
               const breaer=bearerHeader.split(' ')[1]
            //    console.log(bearerHeader.spilt(' ')[1])
               const user=jwt.verify(breaer,process.env.JWT_TOKEN)
               console.log(user)
               req.user=user
               next()
            } 
        else
            {
                 return res.status(500).json({message:'token does not exist'})
            }     
    } catch (error) {
        res.status(500).json({message:'some error is occured'})
    }
}