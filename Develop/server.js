const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

//parses incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//a middleware that drills in and allows access for style sheet and htmls
app.use(express.static(__dirname + '/public'));



app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})



// GET request for notes
app.get('/api/notes', (req, res) => {
  // get db json data

  //display the db/db.json data
  const results = fs.readFileSync(path.join(__dirname,"./db/db.json"), "utf-8" )
  console.log(typeof results)

  res.json(JSON.parse(results))
});



//create new note function using post method
app.post('/api/notes', (req,res) => {
  console.log(req.body)

  //create new parameters
  const newNotes ={
    title: req.body.title,
    text: req.body.text,
    id: uuid()
  }

  //an array 
  const noteData = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf-8"))

  //push new notes in the array
  noteData.push(newNotes)

  //format the new notedata array and prep to be written
  const noteString = JSON.stringify(noteData,null, "\t");


//writes the file of note string
  fs.writeFileSync(`./db/db.json`, noteString)

  //gives a response to browser in this case the notestring
  res.json(noteString)
})



//create delete note function 
app.delete('/api/notes/:id', (req,res) =>{
console.log(req.params.id)

  const newNoteData = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf-8"))
  console.log(newNoteData)
  for(let i = 0; i < newNoteData.length; i++){
    if(newNoteData[i].id === req.params.id){
      newNoteData.splice( i, 1)

    }
  }
console.log(newNoteData)

fs.writeFileSync(`./db/db.json`, JSON.stringify(newNoteData))

res.json(newNoteData)
})



//get request for home page goes on bottom
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);



//https://shielded-beach-17531.herokuapp.com/