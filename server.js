// Bringing in Dependency

const express = require("express");
const fs = require("fs");
const path = require("path");

//Bringing in Express requirements and environmental port for Heroku 
var app = express();
var PORT = process.env.PORT || 3000;

// Setting up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up middleware to serve static files
app.use(express.static("public"));

//Defining routing to home page and notes page 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

 // Setting up the /api/notes get route and response
 app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data);
        const newDb = [];

        db.push(req.body);

        for (let i = 0; i < db.length; i++)
        {
            const newNote = {
                title: db[i].title,
                text: db[i].text,
                id: i
            };

            newDb.push(newNote);
        }

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newDb, null, 2), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data);
        const newDb = [];

        for(let i = 0; i < db.length; i++)
        {
            if (i !== id)
            {
                const newNote = {
                    title: db[i].title,
                    text: db[i].text,
                    id: newDb.length
                };

                newDb.push(newNote);
            }
        }

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newDb, null, 2), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}.`);
})