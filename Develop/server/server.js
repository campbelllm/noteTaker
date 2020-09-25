// dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

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

app.get('/api/notes', (req, res) => {
    res.send('notes')
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))