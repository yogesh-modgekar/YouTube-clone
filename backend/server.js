import express from 'express'
import mongoose from 'mongoose';
import { router } from './Routes/user.js';
import { videoRoutes } from './Routes/video.js';
import cookieParser from "cookie-parser"
import { commentRoutes } from './Routes/comment.js';
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:3000',  // React app Url
    credentials : true
}))

const port = 4000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/youtube")
.then(()=>{
    console.log("Database coonected successfully..!")
})
.catch(()=>{
    console.log("Unable to connect..Please try again")
});

// routes
app.use('/auth', router);
app.use('/api', videoRoutes)
app.use('/commentApi',commentRoutes)



// Creating a Server
app.listen(port,()=>{
    console.log('Server is running on port number:4000');
})