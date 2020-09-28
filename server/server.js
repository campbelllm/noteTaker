// dependencies
const express = require("express");
const app = express();
const notesController = require("./notesController");
const PORT = process.env.PORT || 8080;

//middlware
app.use(express.json());
// for any request check this static (never changing, not moving, css, html, js) to see if there is anything request needs
app.use(express.static("../public"));
//telling express what to kind of data to expect on the request
app.use(express.urlencoded({ extended: true }));

//route requests
app.get("/", notesController.displayIndex);
app.get("/notes", notesController.displayNotes);
app.get("/api/notes", notesController.sendNotes);
app.post("/api/notes", notesController.addNote);
app.delete("/api/notes/:id", notesController.deleteNote);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
