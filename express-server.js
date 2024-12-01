import express from 'express'
import connectToDb from './mongodb/mongodb-connect.js'
import cors from 'cors'
import registerRouter from './apis/register.js'
import verifyUser from './apis/verify-account.js'
import loginRouter from './apis/login.js'
import forgotPasswordRouter from './apis/forgot-password.js'
import resetPasswordRouter from './apis/reset-password.js'
import shortUrlRouter from './apis/short-url.js'
import verifyRouter from './apis/verify.js'
import { db } from './mongodb/mongodb-connect.js'
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
app.use('/verify-account',verifyUser)
app.use('/login',loginRouter)
app.use('/forgot-password',forgotPasswordRouter)
app.use('/reset-password',resetPasswordRouter)
app.use('/short-url',shortUrlRouter)
app.use('/verify',verifyRouter)
const port = 7302
app.listen(port,()=>{
    console.log('port',port ,'running...')
})