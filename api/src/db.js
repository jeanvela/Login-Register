const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1/loginRegister')
        console.log(`Database is connected to ${db.connection.db.databaseName}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConnect
}
