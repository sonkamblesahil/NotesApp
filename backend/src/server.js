import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import notesRoutes from './routes/notesRoutes.js'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()


const app = express()




app.use(cors({
  origin:"http://localhost:5173"
}))
app.use(express.json(urlencoded({ extended: true }))) //parses the json body: req body

app.use(rateLimiter )

app.use((req,res,next)=>{
  console.log(`the request method is ${req.method} and the request url is /${req.url}`)
  next()
})

app.use('/', notesRoutes)

connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port ${process.env.PORT || 5001}`)
  })

})


