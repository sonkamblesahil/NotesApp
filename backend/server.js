import express from 'express'

const app = express()

app.get('/api/notes',(req,res)=>{
    res.send("hello world")
})

app.listen(5001, () => {
  console.log('Server is running on port 5001')
})