// middlewares/validateRating.js
module.exports = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === undefined) {
    return res.status(400).json(
      { message: 'O campo "rate" é obrigatório' },
    );
  }

  if (rate % 1 !== 0 || rate <= 0 || rate > 6) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
    );
  }

  next();
};