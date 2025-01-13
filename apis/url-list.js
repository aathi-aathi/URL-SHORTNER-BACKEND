import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const urlList = express.Router()
urlList.get('/:email',async(req,res)=>{
    const {email} = req.params
    const data = await db.collection('Urls').find({email:email}).toArray()
    res.send(data)
})
urlList.delete('/:id',async(req,res)=>{
    const {id} = req.params
    await db.collection('Urls').deleteOne({id:id})
    res.send({msg:'deleted'})
})
export default urlList