const modules = require('../modules/modules.js')
const mongoose = require('mongoose')
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const filename=Date.now()+path.extname(file.originalname)
        cb(null,filename)

    }
})
const fileFilter=(req,file,cb)=>{

    if(file.mimetype.startsWith('image/'))
    {
        cb(null,true)
    }
    else
    {
        cb(Error("some error is occured"))
    }
}
const uploads=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*3
    }
    
})
exports.CreateUser = async (req, res) => {
    try {
       console.log("DSF")
        const { first_name, last_name, email, age, phone, gender} = req.body
        const profile_pic = req.file.filename; 

           if (!first_name &&!last_name && !email && !age && !phone && !gender) {
            return res.status(404).json({ message: 'some error is occured' })
        }
     
        const user = await modules.create({ first_name,last_name,email,age,phone,gender,profile_pic })
        if (!user) {
            return res.status(404).json({ message: 'due to error user cant be created' })
        }
        res.status(200).json({ message: 'user is created', user })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.AllUser = async (req, res) => {
   try {
    // Ensure search is always a string
    console.log("DSf")
    const search = req.query.search ? String(req.query.search) : "";

    const query = search
        ? {
            $or: [
                { first_name: { $regex: search, $options: "i" } },
                { last_name: { $regex: search, $options: "i" } }
            ]
          }
        : {}; // if no search term, return all users

    const result = await modules.find(query);

    if (result.length === 0) {
        return res.status(404).json({ message: "users not found" });
    }

    res.status(200).json({ message: "All users", result });
} catch (error) {
    res.status(500).json({ message: "some error occurred", error: error.message });
}
}
exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(484).json({ message: 'id is not valid' })
        }
        const finduser = await modules.findById(id)
        if (!finduser) {
            return res.status(404).json({ message: 'user does not find' })
        }
        const users = await modules.findByIdAndDelete(id)
        if(users.profile_pic)
        {
          const paths=path.join(__dirname,`../uploads/${users.profile_pic}`)
          fs.unlink(paths,(error)=>{
            if(error)
            {
                return res.status(500).json({message:'some error is occured',error:error.message})
            }
          })
        
        }
        if (!users) {
            return res.status(404).json({ message: 'user cannot be deleted' })
        }
        res.status(200).json({ message: 'user is deleted' })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.SingleUser = async (req, res) => {
    try {
        console.log("DS")
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // console.log()
            return res.status(484).json({ message: 'id is not valid' })
        }
        const finduser=await modules.findById(id)
        if(!finduser)
        {
             return res.status(404).json({message:'user is not found'})
        }
        res.status(200).json({message:'user',finduser})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'some error is not occured',error:error.message})
    }
}
exports.UpdateUser=async (req,res) => {
  
    try {
       
         const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(484).json({ message: 'id is not valid' })
        }
        const finduser = await modules.findById(id)
        
      
        if (!finduser) {
            return res.status(404).json({ message: 'user does not find' })
        }
          if(req.file)
        {
          
            if(finduser.profile_pic)
            {
                
                const paths=path.join(__dirname,`../uploads/${finduser.profile_pic}`)
               
                fs.unlink(paths,(err)=>{
                    if(err)
                    {
                        res.status(500).json({message:'imagae occured',error:err.message})
                    }
                })
            }
            req.body.profile_pic=req.file.filename
        }
        const UpdateUser=await modules.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
        })
        if(!UpdateUser)
        {
            res.status(404).json({message:'user cannot be updated'})
        }
        res.status(200).json({message:'updated user',UpdateUser})
    } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.ImageMulter=uploads.single('profile_pic')