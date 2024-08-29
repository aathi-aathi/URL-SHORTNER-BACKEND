import express from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dontenv from 'dotenv'
import { db } from "../mongodb/mongodb-connect.js"
import { mailOptions, transporter } from "./mail-utils.js"
dontenv.config()
 const registerRouter = express.Router()
registerRouter.post("/",async(req,res)=>{
    const userData = req.body
    const collection = db.collection("users")
    const userObj = await collection.findOne({email:userData.email})
      try {
        if(userObj){
            res.status(400).send({message:"User already exist",code:1})
        }
        else{
            bcrypt.hash(userData.password,10,async function(err,hash) {
                if(err){
                    res.status(500).send({msg:"something error in your password"})
                }
                else{
                    await collection.insertOne({
                ...userData,
                password:hash,
                isVerified:false,
                longUrl:[],
                shortUrl:[]
            })
            var token = jwt.sign(
                {email: userData.email },
                process.env.JWT_SECRET,
                {
                  expiresIn: "15m",
                })
            await transporter.sendMail({
                ...mailOptions,
                to:userData.email,
                subject:"Welome to Gmail",
                text: `Please verify your account
                ${process.env.FE_URL}/verify-account/${token}
                `, 
              })
             res.send({msg:"registered successfully"})
    
        }});
    } 
      } catch (error) {
        res.status(500).send({message:'Something went wrong'})
      }
    

})

export default registerRouter