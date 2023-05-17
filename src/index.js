const express = require('express');
const { readTalkerData } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Req 1
app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();
  if (talkers) {
    return res.status(200).json(talkers);
  }
  res.status(200).json([]);
});

module.exports = app;