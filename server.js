const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// let num = 1;

let newTip



const PORT = process.env.PORT || 3001;

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static('public'));



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


// Wildcard route to direct users to a 404 page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);





app.get('/api/notes', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

    // res.json(noteData);
      
console.log(" get, page asked for notes")
//   res.sendFile(path.join(__dirname, '/public/index.html'))
});


app.post('/api/notes', (req, res) =>{

    console.log ("inside post");

    // console.log (req.body);

    // res.json (req.body)

    
    const { title, text} = req.body;

  if (req.body) {
     newTip = {
      title,
      text,
      id: uuidv4(),
    };

    // const jnewTip = JSON.stringify(newTip)
  
    console.log (newTip) 

    readAndAppend(newTip, './db/db.json');

    // res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
  res.json(newTip);
    })


// Wildcard 
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    
   
  );

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