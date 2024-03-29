const express = require("express");
const app = express();
//import http from "http";

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "Me tengo que suscribir a @midudev en YouTube noma",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Tengo que estudiar las clases del FullStack Bootcamp",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "Repasar los retos de JS de midudev",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

const generateId = () => {
  const notesIds = notes.map((n) => n.id);
  const maxId = notesIds.length ? Math.max(...notesIds) : 0;
  const newId = maxId + 1;
  return newId;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  if (!note.content) {
    return response.status(400).json({
      error: 'required "content" field is missing',
    });
  }

  const newNote = {
    id: generateId(),
    content: note.content,
    date: new Date(),
    import: note.important || false,
  };

  notes = notes.concat(newNote);

  response.status(201).json(note);
});

const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
