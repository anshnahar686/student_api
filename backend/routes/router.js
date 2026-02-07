const express=require('express')
const controllers=require('../controllers/controllers.js')
const routers=express.Router()
routers.post('/creates',controllers.ImageMulter,controllers.CreateUser).get('/all',controllers.AllUser).get('/single/:id',controllers.SingleUser).patch('/updates/:id',controllers.ImageMulter,controllers.UpdateUser).delete('/delete/:id',controllers.DeleteUser)
module.exports=routers