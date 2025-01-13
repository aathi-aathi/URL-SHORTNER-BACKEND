import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'

const userInfo = express.Router()
userInfo.get('/:email',async(req,res)=>{
    const {email} = req.params
    const data = await db.collection('users').findOne({email:email},{projection:{name:1}})
    res.send(data)
})
export default userInfo