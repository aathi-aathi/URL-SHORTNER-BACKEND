import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'


const checkOtpRouter= express.Router()
checkOtpRouter.post('/',async(req,res)=>{
    const {email,otpnum} = req.body
     const userObj = await db.collection('users').findOne({email:email})
     let actual_otp = userObj.otp
     try {
          if(otpnum == actual_otp){
            await db.collection('users').updateOne({email:email},{$unset:{otp:''}})
            res.send({message:'otp get successfully',code:1})  
     }
     else{
        res.send({message:'Your otp is incorrect',code:0})
     }
     } catch (error) {
        res.send({message:'Something went wrong'})
     }
   


})
export default checkOtpRouter;