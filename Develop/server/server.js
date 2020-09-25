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
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))