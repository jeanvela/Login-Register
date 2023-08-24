const mongoose = require('mongoose')

const dbConnect = async () => {
    //'mongodb://127.0.0.1/loginRegister'
    try {
        const db = await mongoose.connect('mongodb+srv://alejandrovelaarana:Yk4KEPP6ybZy8RqN@loginregister.rh2n0fe.mongodb.net/?retryWrites=true&w=majority')
        console.log(`Database is connected to ${db.connection.db.databaseName}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConnect
}