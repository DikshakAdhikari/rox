import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { mongooseConnect } from './connection/connect.js'
import productRouter from './routes/product.js'
dotenv.config()
const app= express()
mongooseConnect()
// app.use(cors({
//     origin: 'https://dikshak-blogging.vercel.app', 
//     credentials:true
//   })); 

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials:true
})); 
  
app.use(express.json())
app.use('/product', productRouter)
app.get('/', (req,res)=> {
  res.json({message:"Hello baby"})
})

app.listen(process.env.PORT , ()=> console.log(`Server listening on port ${process.env.PORT}`))