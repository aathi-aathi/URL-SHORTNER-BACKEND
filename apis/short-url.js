import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
import dotenv from 'dotenv'
import shortid from 'shortid'
dotenv.config()
const shortUrlRouter = express.Router()
const indiaTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
shortUrlRouter.post('/',async(req,res)=>{
    const userData = req.body
    const id = shortid.generate()
    const shortUrl =`${req.protocol}://${req.get('host')}/${id}`
    await db.collection('Urls').insertOne({
        longUrl:userData.longUrl,
        id:id,
        date:indiaTime,
        email:userData.email,
        shortUrl:shortUrl
    })  
    res.send({shortUrl:shortUrl})
})
export default shortUrlRouter