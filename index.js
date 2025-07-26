const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Set up Pusher instance
const pusher = new Pusher({
  appId: "2028008",
  key: "b78c3262430b985587a3",
  secret: "7df0479161e4e5a0594c",
  cluster:  "us2",
  encrypted: true
});
app.get("/", (req, res)=>{
  res.json({message: "Hello there!"});
})

// Route to send messages to the chat room (via Pusher)
app.post('/send-message', (req, res) => {
  const { name, message } = req.body;

  // Trigger an event in Pusher on the 'chat-channel'
  pusher.trigger('chat-channel', 'new-message', {
    name,
    message
  });

  res.status(200).json({ message: 'Message sent' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;