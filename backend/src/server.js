import express, { urlencoded } from 'express'
import { connectDB } from './config/db.js'
import notesRoutes from './routes/notesRoutes.js'
import dotenv from 'dotenv'

dotenv.config()


const app = express()
connectDB()

app.use(express.json(urlencoded({ extended: true })))

app.use('/api/notes', notesRoutes)



app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`)
})

