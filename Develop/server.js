const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

//parses incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//a middleware that drills in and allows access for style sheet and htmls
app.use(express.static('public'));

//get requests 
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


// GET request for notes
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.json(`${req.method} request received to get notes`);
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

//create new note function





//create delete note function 






app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);