const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');


let note = [
    {
    "title": "Test 1",
    "text": "Test text 1",
    "id": "123"
    }
    
]


const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));


app.get('/api/notes', (req, res) => {

    res.json(note);
      

console.log("page asked for notes")
//   res.sendFile(path.join(__dirname, '/public/index.html'))
});


// GET Route for homepage
app.post('/api/notes', (req, res) =>{
res.json("successful post");
console.log("/api/notes was pressed")
//   res.sendFile(path.join(__dirname, '/public/index.html'))
});





// GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

// Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
