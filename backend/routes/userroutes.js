const express=require('express')
const routers=express.Router()
const controllers=require('../controllers/login_controllers')
routers.post('/register',controllers.Register).post('/login',controllers.Login).get('/logout',controllers.Logout)
module.exports=routers