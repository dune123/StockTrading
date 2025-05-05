const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')

dotenv.config()

const app=express()

app.use(express.json())
app.use(cors())


//for routes
app.use('/api/auth',userRoutes)

app.get('/',(req,res)=>{
    res.send('Stock trading App Backend is running!')
})

const PORT=process.env.PORT||5000
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err)=>{
    console.error('❌ MongoDB connection error:', err.message);
})