const connectToMongo = require('./db')
const express = require('express')
let cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/employee', require('./routes/Employee'))

app.listen(port, () => {
  console.log(`Backend listening on port http://localhost:${port}`)
})