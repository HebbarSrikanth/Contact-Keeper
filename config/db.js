const mongoose = require('mongoose')
const config = require('config')
//Fetch the mongo URL defined in the configuration file
const dbConfig = config.get('mongoURL')

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("Connected to DB!!!")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB;