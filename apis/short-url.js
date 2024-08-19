import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
import shortid from 'shortid'
const shortUrlRouter = express.Router()
shortUrlRouter.get('/:email',async(req,res)=>{
    const userdata = req.params
   const data = await db.collection('users').findOne({email:userdata.email})
    res.send(data)
})
shortUrlRouter.post('/',async(req,res)=>{
    const userData = req.body
    const shortUrl = 'http://'+shortid.generate()
    await db.collection('users').updateOne(
        {email:userData.email},
        {$push:{longUrl:userData.longUrl,shortUrl: shortUrl}})
    res.send({shortUrl:shortUrl})
})
export default shortUrlRouter