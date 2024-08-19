import express from "express";
import { db } from "../mongodb/mongodb-connect.js";

const verifyRouter = express.Router()
verifyRouter.post('/:email',async(req,res)=>{
    const email = req.params.email
    console.log(email)
  const userObj =  await db.collection('users').findOne({email:email,isVerified:true})
  if(userObj){
    res.send({msg:'verified',code:1})
  }else{
    res.status(404).send({msg:'valid'})
  }
    
})
export default verifyRouter;