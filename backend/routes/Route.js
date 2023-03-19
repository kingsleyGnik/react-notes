// Route.js
const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./account.js') // import account route
const auth = require('./auth.js') 
const notes = require('./notes.js') 
//const notesApi = require('./notesApi.js') 
router.use(accountRoutes) // use account route
router.use(auth) 
router.use(notes) 

module.exports = router;