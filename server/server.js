import express from 'express'
import mongoose from 'mongoose'
import Wine from './models/Wine.js'
const app = express()
const PORT = process.env.PORT || 1111
app.listen(PORT,()=> console.log(`Server Running on Port: ${PORT}`))
app.use(express.json())
app.use(express.static('../dist'));
(async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    }catch(err){
        console.log(err)
    }
})()
const items = [
    {name:'Laptop',price:500},
    {name:'Desktop',price:700}
]
app.get('/api/items',(req,res)=>res.send(items))
app.post('/api/wines', async (req,res)=>{
    try{
        await Wine.create({
            type:req.body.type,
            section:req.body.section,
            category:req.body.category,
            region:req.body.region,
            subRegion: req.body.subRegion,
            bin:req.body.bin,
            description:req.body.description,
            vintageSize:req.body.vintageSize,
            price:req.body.price,
            microsPrice:0,
            sequence:0
        })
        console.log('Added to Database: ___')
        res.json('Added to Database: ___')
    }catch(err){
        console.log(err)
    }
})
app.delete('/api/wines/:id', async(req,res)=>{
    try{
        await Wine.findByIdAndDelete(req.params.id)
        console.log('Deleted from Database: ___')
        res.json('Deleted from Database: ___')
    }catch(err){
        console.log(err)
    }
})
app.get('/api/wines',async(req,res)=>{
    try{
        const allWines = await Wine.find()
        console.log('All Wines from Database: ')
        res.json(allWines)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/wines/:id',async(req,res)=>{
    try{
        const wine = await Wine.findById(req.params.id)
        console.log('1 Wine from Database: ___')
        res.json(wine)
    }catch(err){
        console.log(err)
    }
})
app.put('/api/wines/:id',async(req,res)=>{
    try{
        await Wine.findByIdAndUpdate({_id:req.params.id},{
            type:req.body.type,
            section:req.body.section,
            category:req.body.category,
            region:req.body.region,
            subRegion: req.body.subRegion,
            bin:req.body.bin,
            description:req.body.description,
            vintageSize:req.body.vintageSize,
            price:req.body.price,
            microsPrice:req.body.microsPrice,
            sequence:0
        })
        console.log('Wine ___ updated to: ___')
        res.json('Wine ___ updated to: ___')
    }catch(err){
        console.log(err)
    }
})
setInterval(()=>fetch('https://mern-elmar.onrender.com'),600000)