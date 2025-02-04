require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
