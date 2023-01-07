const router = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFileSync, readAndAppend } = require('../helpers/file');

// GET Route for retrieving all the tips
router.get('/api/tips', (req, res) => {
  console.info(`${req.method} request received for tips`);
  const data = readFileSync('./db/tips.json', 'utf8');
  res.json(JSON.parse(data));
});

// POST Route for a new UX/UI tip
router.post('/api/tips', (req, res) => {
  console.info(`${req.method} request received to add a tip`);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newTip = {
      username,
      tip,
      topic,
      tip_id: uuid(),
    };

    readAndAppend(newTip, './db/tips.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

// GET Route for retrieving all the feedback
router.get('/api/feedback', (req, res) => {
  console.info(`${req.method} request received for feedback`);
  const data = readFileSync('./db/feedback.json', 'utf8');
  res.json(JSON.parse(data));
});

// POST Route for submitting feedback
router.post('/api/feedback', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit feedback`);

  // Destructuring assignment for the items in req.body
  const { email, feedbackType, feedback } = req.body;

  // If all the required properties are present
  if (email && feedbackType && feedback) {
    // Variable for the object we will save
    const newFeedback = {
      email,
      feedbackType,
      feedback,
      feedback_id: uuid(),
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
