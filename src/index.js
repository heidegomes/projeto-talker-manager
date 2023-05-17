const express = require('express');
const { readTalkerData, generateToken, writeNewTalkerData } = require('./utils/fsUtils');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateRate = require('./middlewares/validateRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateTalk = require('./middlewares/validateTalk');
const validateAge = require('./middlewares/validateAge');
const validateName = require('./middlewares/validateName');
const auth = require('./middlewares/auth');

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

// Req 2

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkerData();
  const talkerId = talkers.find(({ id }) => id === Number(req.params.id));
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// Req 3 e 4
app.post('/login',
  validateEmail,
  validatePassword,
  (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      return res.status(200).json({ token: generateToken() });
    }
  });

// Req 5
app.post('/talker',
  auth, validateName, validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
    const talkers = await readTalkerData();
    const data = req.body;
    const newTalker = { id: talkers[talkers.length - 1].id + 1, ...data };
    await writeNewTalkerData(newTalker);
    res.status(201).json(newTalker);
  });

module.exports = app;