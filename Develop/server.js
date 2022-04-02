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
app.use(express.static('public'));



app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})



// GET request for notes
app.get('/api/notes', (req, res) => {
  // get db json data
  const results = fs.readFileSync("./db/db.json", "utf-8" )
  console.log(typeof results)

  res.json(JSON.parse(results))
});



//create new note function
app.post('/api/notes', (req,res) => {
  console.log(req.body)

  const newNotes ={
    title: req.body.title,
    text: req.body.text,
    id: uuid()
  }

  const noteData = JSON.parse(fs.readFileSync("./db/db.json" , "utf-8"))

  noteData.push(newNotes)

  const noteString = JSON.stringify(noteData,null, "\t");

  fs.writeFileSync(`./db/db.json`, noteString)

  res.json(noteString)
})



//create delete note function 
app.delete('/api/notes/:id', (req,res) =>{
console.log(req.params.id)

  const newNoteData = JSON.parse(fs.readFileSync("./db/db.json" , "utf-8"))
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



//get route route requests 
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);