const express = require('express');
const saveRecordingRouter = require('./saveRecording'); // Import saveRecording.js

const app = express();
const PORT = 3001;

app.use(express.json());

// Use the saveRecording router
app.use('/api', saveRecordingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
