import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const verifyUser = express.Router()
verifyUser.post('/',async(req,res)=>{
    const token = req.body
    console.log(token.userData)
    try {
       const data = jwt.verify(token.userData,process.env.JWT_SECRET)
       console.log(data.email)
        await db.collection('users').updateOne({email:data.email},{$set:{isVerified:true}})
    res.send({msg:'token get successfully',code:1}) 
    } catch (error) {
        res.status(500).send({msg:'token has been expired'})
    }
    
})
export default verifyUser;