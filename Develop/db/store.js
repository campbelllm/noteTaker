const util = require('util');
const fs = require('fs');
//pacakge that generates unique id's
const uuidv1 = require('uuidv1')

const readFileAsync = util.promisify(fs.readFile());
const writeFileAsync = util.promisify(fs.writeFile());

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8');
    }
    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(notes => {
            let parseNotes;
            try{
                parseNotes = [].concat(JSON.parse(notes))
            }catch(err){
                parseNotes = [];
            }
            return parseNotes;
        })
    }
    addNote(note){
        const {title, text} = note;

        if(!title || !text){
            throw new Error ('Note: "Title" and "Text" cannot be blank.');
        }
        const newNote = {title, text, id: uuidv1()};
        return this.getNotes()
                .then(notes => [...notes, newNote])
                .then(updateNotes => this.write(updateNotes))
                .then(() => newNote);
    }
    removeNote(id){
        return this.getNotes()
                .then((notes  => notes.filter(note => note.id !== id))
                .then(filterNotes => this.write(filterNotes)))
    }
}

module.exports = new Store();