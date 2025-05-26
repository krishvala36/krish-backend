const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Images store karne ke liye ek simple in-memory array
let images = [
  "https://via.placeholder.com/300x200?text=Default+1",
  "https://via.placeholder.com/300x200?text=Default+2",
  "https://via.placeholder.com/300x200?text=Default+3"
];

// GET /images - sab images bhejo
app.get('/images', (req, res) => {
  res.json(images);
});

// POST /images - naya image add karo
app.post('/images', (req, res) => {
  const { url } = req.body;
  if (url && !images.includes(url)) {
    images.push(url);
    res.status(201).json({ message: 'Image added' });
  } else {
    res.status(400).json({ message: 'Invalid or duplicate URL' });
  }
});

// DELETE /images - image delete karo
app.delete('/images', (req, res) => {
  const { url } = req.body;
  const index = images.indexOf(url);
  if (index !== -1) {
    images.splice(index, 1);
    res.json({ message: 'Image deleted' });
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
});

// Server start karo
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
