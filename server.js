const { app } = require('./app')
require('dotenv').config()

//SET PORT
const PORT = process.env.PORT || 4000

// SERVER INITIALIZATION
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))