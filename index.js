const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
require('dotenv').config();
const multer = require('multer')
const path = require('path')
const upload = require('../server/middleware/imageUpload');

//express app
const app = express()
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))

//middleware
app.use(express.json())

mongoose.connect("mongodb+srv://test_user:test123@cluster0.x1t67.mongodb.net/Ticket_Booking?retryWrites=true&w=majority&appName=Cluster0")



const userRoutes = require('./routes/userRoutes/userRouter')
const showRoutes = require('./routes/showRoutes/showRouter')

app.use('/public', express.static(path.join(__dirname, 'public')));


//routes
app.use('/api/user', userRoutes)
app.use('/api/shows',upload.single('file'), showRoutes)


app.listen(3001, ()=> {
    console.log("server is running")
})























//app.get("/getUsers", (req, res) => {
    //     UserModel.find({}).then(function(users){
    //         res.json(users)
    //     }).catch(function(err){
    //         res.json(err)
    //     })
    // })
    
    // app.post("/createUser", async (req, res) => {
    //     const user = req.body;
    //     const newUser = new UserModel(user);
    //     await newUser.save();
    //     res.json(user);
    // })

