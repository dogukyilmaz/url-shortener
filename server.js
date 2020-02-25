const express = require('express');
const mongoose = require('mongoose');
const ShortURL = require('./models/shortUrl');
const app = express();

const mongoURI = 'mongodb://localhost/urlShortener';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, () => {
  console.log('MongoDB Connected...')
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const shortURLs = await ShortURL.find();
  res.render('index', { shortURLs: shortURLs });
});

app.post('/shortenUrl', async (req, res) => {
  try {
    await ShortURL.create({ fullURL: req.body.defaultURL });
  } catch (error) {
    console.log(error);
  };
  res.redirect('/');
});

app.get('/:shortURL', async (req, res) => {
  const shortURL = await ShortURL.findOne({ shortURL : req.params.shortURL});
  if(shortURL == null) return res.sendStatus(404);

  shortURL.clicks++;
  await shortURL.save();

  res.redirect(shortURL.fullURL);
});

app.listen(process.env.PORT || 4500, () => {
  console.log(`Server is listening on localhost:4500`)
});