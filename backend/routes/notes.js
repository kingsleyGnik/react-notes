// account.js
const express = require("express")
const noteRoutes = express.Router();
const fs = require('fs');
const dataPath = 'data/notes.json' // path to our JSON file

// util functions
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}
const convertToArr = (existAccounts, ) => {
  var arr = []
  console.log("existAccounts[key]");

  for (const key in existAccounts) {
    // if (population.hasOwnProperty(key)) {
    //   console.log(`${key}: ${existAccounts[key]}`);
    // }
    // if (existAccounts[key].username === currentUser.username) {
    //     exist = true
    // }
    console.log(existAccounts[key]);
    arr.push({...existAccounts[key], noteId: key})
}
  return arr
}

noteRoutes.post('/notes/create', (req, res) => {
 
    var existNotes = getAccountData()
    const newnoteId = Math.floor(100000 + Math.random() * 900000)
 
    existNotes[newnoteId] = req.body
   
    console.log(existNotes);
    saveAccountData(existNotes);
    res.send({success: true, msg: 'notes were added successfully'})
})

// Read - get all notes from the json file
noteRoutes.get('/notes/allnotes', (req, res) => {
    const notes = getAccountData()
    var noteArr = convertToArr(notes)
    console.log("converted to array", noteArr)
    res.send(noteArr)
  })
noteRoutes.get('/notes/:id', (req, res) => {
    const notes = getAccountData()
    console.log(notes);
    const noteId = req.params['id'];
    var note = notes[noteId]
    res.send(note)
  })

  // Update - using Put method
noteRoutes.put('/notes/:id', (req, res) => {
    var existNotes = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const noteId = req.params['id'];
      existNotes[noteId] = req.body;
      saveAccountData(existNotes);
      res.send(existNotes)
      //res.send(`notes with id ${noteId} has been updated`)
    }, true);
  });

  // delete - using delete method
noteRoutes.delete('/notes/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existNotes = getAccountData()
      const userId = req.params['id'];
      delete existNotes[userId]; 
      saveAccountData(existNotes);
      res.send(`notes with id ${userId} has been deleted`)
    }, true);
  })

module.exports = noteRoutes