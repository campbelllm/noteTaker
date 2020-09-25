// dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { runInNewContext } = require('vm');

//port
const PORT = 8080;

//middlware
app.use(express.json())
// for any request check this static (never changing, not moving, css, html, js) to see if there is anything request needs
app.use(express.static('../public'))
//telling express what to kind of data to expect on the request
app.use(express.urlencoded({extended: true}));

//route requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

//sending back notes in json
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, notes) => {
        if (err) throw err;
        res.send(JSON.parse(notes))
    })
});

app.post('/api/notes', (req, res) => {
    //grabbing current notes from db.json
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    //grabbing last id in array
    let id = notes[notes.length -1].id
    //if there is no id yet, set id to 0
    if(!id){
        id = 0;
    //otherwise set id to last id in array + 1
    }else{
        id++;
    }
    // here we are adding the new note typed in, assigning values to a var
    const newNote =  req.body
    //giving the new not and id
    newNote.id = id
    //push new not to notes array (what we grabbed from the file above)
    notes.push(newNote)
    const noteStringify = JSON.stringify(notes)
    //write file with new note added
    fs.writeFile('../db/db.json', noteStringify, (err) => {
        if(err) throw err;
    })
    res.status(400)
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))