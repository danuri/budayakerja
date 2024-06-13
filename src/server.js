const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/')));
app.use(cookieParser());

  app.get('/budayakerja', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/setcookie', (req, res, next) => {
    console.log('setcookie')
    res.cookie('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bGFlaGEiLCJyb2xlX2lkIjozLCJub19wZW5kYWZ0YXJhbiI6IjQ1MDAwMTIiLCJqZW5pc190dWdhc19sYXRlc3QiOiJLT05TIiwiamFiYXRhbl90dWdhcyI6IktFUEFMQSIsImZ1bGxuYW1lIjoiSlVMQUVIQSIsImVtYWlsIjoianVsYWVoYUBtYWlsLmNvbSIsImthbndpbF9wcm92aW5zaSI6bnVsbCwia2Fud2lsX2tvdGEiOm51bGwsIm5hbWFfa2Fud2lsIjpudWxsLCJ0YWh1bl9oYWppX25hbWUiOiIxNDQ1IEgvMjAyNCBNIiwiaWF0IjoxNzE4MDExMTc4LCJleHAiOjE3NDEzMzkxNzh9.xLgcS43nTMnIkUYEOCbusazvF05J-4J_ru74W_fS_b0')
    res.redirect('/')
  });
  
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });