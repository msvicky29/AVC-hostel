const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const adminRoute = require('./routes/route.js')
const authenticateToken = require('./auth/authenticateToken.js')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connected successfully ✅✅"))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    }),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, // Set a longer timeout, e.g., 30 seconds
    }

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

// Protected route for token verification
app.get('/api/protected-route', authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: 'Protected route accessed successfully',
        user: req.user
    })
})

// Other routes
app.use('/api', adminRoute)




app.listen(5000, () => {
    console.log("Server Started!!✅")
})