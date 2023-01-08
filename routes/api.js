const router = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFileSync, readAndAppend } = require('../helpers/file');

// GET Route for retrieving all the tips
router.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for tips`);
  const data = readFileSync('./db/feedback.json', 'utf8');
  res.json(JSON.parse(data));
});

// POST Route for a new UX/UI tip
router.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text} = req.body;

  if (req.body) {
    const newTip = {
      title,
      text,
      tip_id: uuid(),
    };

    readAndAppend(newTip, './db/feedback.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// GET Route for retrieving all the feedback
router.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for note`);
  const data = readFileSync('./db/feedback.json', 'utf8');
  res.json(JSON.parse(data));
});

// POST Route for submitting feedback
router.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit note`);

  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newFeedback = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newFeedback, './db/feedback.json');

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = router;
