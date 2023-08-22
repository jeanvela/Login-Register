const app = require('./src/app.js')
const { dbConnect } = require('./src/db.js')

const Port = 3001

dbConnect()
app.listen(Port, () => {
    console.log(`%s listening at ${Port}`)
})
