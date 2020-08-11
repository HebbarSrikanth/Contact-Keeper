const express = require('express')
const app = express();

//Connect to DB
const connectDB = require('./config/db')
connectDB();

//Parse the incoming request
app.use(express.json())

//import all the required routes
const userRoute = require('./router/user')
const contactRoute = require('./router/contacts')
const authRoute = require('./router/auth')

//route middleware using app.use
app.use('/api/auth', authRoute)
app.use('/api/contacts', contactRoute)
app.use('/api/user', userRoute)

app.get('/', (req, res) => {
    res.json({ "msg": "Welcome to Contact-Keeper backend API!!!" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server is up & running in the PORT ' + PORT + ' !!!!'))