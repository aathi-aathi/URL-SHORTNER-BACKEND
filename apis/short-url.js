import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
import dotenv from 'dotenv'
import shortid from 'shortid'
dotenv.config()
const shortUrlRouter = express.Router()

shortUrlRouter.post('/',async(req,res)=>{
    const userData = req.body
    const id = shortid.generate()
    const shortUrl =`${req.protocol}://${req.get('host')}/${id}`
    await db.collection('Urls').insertOne({
        longUrl:userData.longUrl,
        id:id,
    })  
    res.send({shortUrl:shortUrl})
})
export default shortUrlRouter