const router = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFileSync, readAndAppend } = require('../helpers/file');

// GET Route for retrieving all the tips
router.get('/api/notes', (req, res) => {
  const data = readFileSync('./db/notes.json', 'utf8');
  res.json(JSON.parse(data));
});

// POST Route for a new UX/UI note
router.post('/api/notes', (req, res) => {

  const { title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// GET Route for retrieving all the feedback
router.get('/api/notes', (req, res) => {
  const data = readFileSync('./db/notes.json', 'utf8');
  res.json(JSON.parse(data));
});



// POST Route for submitting feedback
router.post('/api/notes', (req, res) => {
  
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting newNote');
  }
});

module.exports = router;
