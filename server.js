require('dotenv').config()
const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

/*
******************************************************************************************
ENVIRONMENT VARIABLES REQUIRED FOR RUNNING THE APP IN SERVER; WORKS LOCALLY TOO

DBURI= mongodb+srv://<USER>:<PASSWORD>...
COOKIE_SECRET= 32+ LENGTH RANDOM BASE 64 STRING
JWT_SECRET_SESSION= 32+ LENGTH RANDOM BASE 64 STRING

******************************************************************************************
*/

//SET PORT
const PORT = process.env.PORT || 4000

//DATABASE
const mongoose = require('mongoose')
mongoose.connect(process.env.DBURI)
mongoose.connection.on('error', err => console.log(err))
const database = mongoose.connection
database.syncIndexes()
database.once('open', () => { console.log('connected to the database :)') })


//INITIALIZING THE APP
const app = express()
const buildPath = path.join(__dirname, 'build')
const indexBuildPath = path.join(__dirname, 'build', 'index.html')
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(expressStaticGzip(buildPath, { enableBrotli: true, orderPreference: ['br', 'gz'] }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));


// //AUTH ROUTES
const registerRoute = require('./server/RoutesUnrestricted/register')
const loginRoute = require('./server/RoutesUnrestricted/login')
const logoutRoute = require('./server/RoutesUnrestricted/logout')
app.post('/register', registerRoute)
app.post('/login', loginRoute)
app.get('/logout', logoutRoute)


// //AUTH MIDDLEWARE
const authMiddleware = require('./server/RouteMiddlewares/authorizationMiddleware')
app.use(authMiddleware)


// // UNIT CONVERTER ROUTES
const getUserRoute = require('./server/RoutesProtected/getUser')
const addConversionRoute = require('./server/RoutesProtected/addUnitConversion')
const deleteConversionRoute = require('./server/RoutesProtected/deleteUnitConversion')
const addPaletteRoute = require('./server/RoutesProtected/addPalette')
const deletePaletteRoute = require('./server/RoutesProtected/deletePalette')
app.get('/get-user', getUserRoute)
app.post('/add-conversion', addConversionRoute)
app.post('/delete-conversion', deleteConversionRoute)
app.post('/add-palette', addPaletteRoute)
app.post('/delete-palette', deletePaletteRoute)


// REDIRECT
// Since its an SPA, if user relogs the page at any url, server will send them the html instead of sending an error
app.get('*', (_, res) => res.sendFile(indexBuildPath))


// SERVER INITIALIZATION
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))