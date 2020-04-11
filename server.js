// requirements 
const fs = require("fs")
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;



// Sets up the Express app to handle data parsing
// This middleware is responsible for constructing the
// body property on the response object passed to our route handlers.
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let noteList = [];
// Routes
// GET REQUEST
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// POST REQUESTS
app.post("/api/notes", (req, res) => {
    const pathJSON = path.join(__dirname, "/db/db.json")

    fs.readFile(pathJSON, "utf8", (err, data) => {
        if (err) throw err;

        let notesSaved = JSON.parse(data);
        res.json(notesSaved);
    });
    let newNote = req.body;
    newNote.id =noteList.length;
    noteList.push(newNote);

    let notesString = JSON.stringify(noteList);
    fs.writeFileSync(pathJSON, notesString, (err) => {
        if (err) throw err;
        res.json(newNote)
    });

});
// // add a route which takes a url parameter
app.delete("/api/notes/:id", (req, res) => {
    const pathJSON = path.join(__dirname, "/db/db.json")
    let deleteIndex;

    noteList.forEach(note => {
        if (note.id.toString() === req.params.id)
            deleteIndex = note.id
    });
    if (deleteIndex === -1) {
        return res.sendStatus(404);
    }
    noteList.splice(deleteIndex, 1);
    fs.writeFileSync(pathJSON, JSON.stringify(noteList), (err) => {
        if (err)
            throw (err);
    });
    return res.sendStatus(200);
});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
