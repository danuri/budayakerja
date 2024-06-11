const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/')));


  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/setcookie', (req, res) => {
    res.sendFile(path.join(__dirname, 'setcookie.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });