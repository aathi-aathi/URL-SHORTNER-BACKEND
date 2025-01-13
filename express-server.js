import express from 'express'
import connectToDb from './mongodb/mongodb-connect.js'
import cors from 'cors'
import registerRouter from './apis/register.js'
import loginRouter from './apis/login.js'
import shortUrlRouter from './apis/short-url.js'
import { db } from './mongodb/mongodb-connect.js'
import checkOtpRouter from './apis/check-otp.js'
import userInfo from './apis/userInfo.js'
import urlList from './apis/url-list.js'
const app = express()
app.use(express.json())
app.use(cors())
await connectToDb()

app.get('/:id',async(req,res)=>{
    const {id} = req.params
    const data = await db.collection('Urls').findOne({id:id},{projection:{_id:0,longUrl:1}})
    if(data){
        res.redirect(data.longUrl)
    }else{
        res.status(404).send('URL not found');
    }
})
app.use('/user',registerRouter)
app.use('/login',loginRouter)
app.use('/short-url',shortUrlRouter)
app.use('/check-otp',checkOtpRouter)
app.use('/get-info',userInfo)
app.use('/url-list',urlList)
const port = 7302
app.listen(port,()=>{
    console.log('port',port ,'running...')
})