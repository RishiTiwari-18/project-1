const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("Connectedf to db")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = dbConnect