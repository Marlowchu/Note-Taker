// imports
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const noteData = require('./db/db.json');

// selecting port
const PORT = process.env.PORT || 3001;

// express varible for easy use
const app = express();


// middleware to handle json request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// making public folder visible to client
app.use(express.static('public'));



// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// );


// Route that retuns notes html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


// API route that returns db values
app.get('/api/notes', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

    
    console.log(" get, page asked for notes")

});

// API route that recieves json from client and saves it to db
app.post('/api/notes', (req, res) =>{

    console.log ("inside post");

    const { title, text} = req.body;

  if (req.body) {
    const newTip = {
      title,
      text,
      id: uuidv4(),
    };
  
    console.log (newTip) 

    readAndAppend(newTip, './db/db.json');

  } else {
    res.error('Error in adding tip');
  }
  res.json("newTip");
    })


// Wildcard api route that returns index page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// choose port to listen on
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// changing fs.readFile into a promise instead of a call back
const readFromFile = util.promisify(fs.readFile);

// write to write to destination
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

//  read from db then push another value to db 
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};