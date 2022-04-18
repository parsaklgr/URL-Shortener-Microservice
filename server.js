require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
// Basic Configuration
const port = process.env.PORT || 3000;
const urls = [];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function (req, res) {
  let originalurl = req.body.url;
  const pattern = /^https:\/\//
  if (pattern.test(originalurl)) {
    if (urls.indexOf(req.body.url) === -1) {
      urls.push(req.body.url);
    }
    res.json({ original_url: req.body.url, short_url: urls.indexOf(req.body.url) + 1 });
  } else {
    res.json({ error: 'invalid url' });
  }
});

app.get("/api/shorturl/:num", (req, res) => {
  console.log(req.params.num);
  res.redirect(urls[parseInt(req.params.num) - 1]);
});
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
