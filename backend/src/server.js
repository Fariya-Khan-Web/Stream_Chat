import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from "cookie-parser"
import path from 'path'
 
import authRoutes from './Routes/auth-routes.js'
import userRoutes from './Routes/user-routes.js'
import chatRoutes from './Routes/chat-routes.js'

import { connectDB } from './lib/db.js'

const app = express()
const PORT = process.env.PORT

const _dirname = path.resolve()


app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true  //allows frontend to send cookies 
    })
)

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
    connectDB()
})