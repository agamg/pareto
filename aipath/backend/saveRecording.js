// Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define the directory where recordings will be saved
const recordingsDirectory = path.join(__dirname, 'recordings');

// Ensure the directory exists
if (!fs.existsSync(recordingsDirectory)) {
  fs.mkdirSync(recordingsDirectory, { recursive: true });
}

// Endpoint to save the video recording
router.post('/save-recording', (req, res) => {
  const { fileName } = req.query;
  const filePath = path.join(recordingsDirectory, fileName || 'recording.webm');

  const writeStream = fs.createWriteStream(filePath);

  req.pipe(writeStream);

  writeStream.on('finish', () => {
    res.status(200).json({ message: 'Recording saved successfully.' });
  });

  writeStream.on('error', (err) => {
    console.error('Error saving recording:', err);
    res.status(500).json({ message: 'Failed to save recording.', error: err.message });
  });
});

module.exports = router;
