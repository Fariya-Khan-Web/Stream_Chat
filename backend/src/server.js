import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import authRoutes from './Routes/auth-routes.js'
import userRoutes from './Routes/user-routes.js'
import chatRoutes from './Routes/chat-routes.js'
import { connectDB } from './lib/db.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)

app.get('/',(req, res)=>{
    res.send('wellcome')
})

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
    connectDB()
})