import express, { urlencoded } from 'express'
import { connectDB } from './config/db.js'
import notesRoutes from './routes/notesRoutes.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()


const app = express()




app.use(express.json(urlencoded({ extended: true }))) //parses the json body: req body

app.use(rateLimiter )

app.use((req,res,next)=>{
  console.log(`the request method is ${req.method} and the request url is /${req.url}`)
  next()
})

app.use('/api/notes', notesRoutes)

connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port ${process.env.PORT || 5001}`)
  })

})


