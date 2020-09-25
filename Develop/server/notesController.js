const path = require('path');
const fs = require('fs');

module.exports = {
    displayIndex: (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
    },
    displayNotes: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    },
    sendNotes: (req, res) => {
        fs.readFile(path.join(__dirname, '../db/db.json'), (err, notes) => {
            if (err) throw err;
            res.send(JSON.parse(notes))
        })
    },
    addNote: (req, res) => {
        //grabbing current notes from db.json
        const notes = JSON.parse(
          fs.readFileSync(path.join(__dirname, "../db/db.json"))
        );
        //if there is no id yet, set id to 0
        let id = () => {
          if (notes.length === 0) {
            return 0;
            //otherwise set id to last id in array + 1
          } else {
            let setId = notes[notes.length - 1].id;
            setId++;
            return setId;
          }
        };
        // here we are adding the new note typed in, assigning values to a var
        const newNote = req.body;
        //giving the new not and id
        newNote.id = id();
        //push new not to notes array (what we grabbed from the file above)
        notes.push(newNote);
        const noteStringify = JSON.stringify(notes);
        //write file with new note added
        fs.writeFile("../db/db.json", noteStringify, (err) => {
          if (err) throw err;
        });
        res.send(noteStringify);
      },
      deleteNote: (req, res) => {
        const id = req.params.id;
        console.log(id);
      
        const notes = JSON.parse(
          fs.readFileSync(path.join(__dirname, "../db/db.json"))
        );
      
        const removedNote = notes.filter((note) => note.id !== parseInt(id));
        const finalNote = JSON.stringify(removedNote);
        console.log(removedNote);
        fs.writeFile("../db/db.json", finalNote, (err) => {
          if (err) throw err;
        });
      
        res.send(finalNote);
      },

}