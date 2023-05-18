module.exports = (req, res, next) => {
  const { age } = req.body;

  if (age === undefined) {
    return res.status(400).json(
      { message: 'O campo \"age\" é obrigatório' },
    );
  }

  if (typeof age !== "number") {
    return res.status(400).json(
      { message: 'O campo \"age\" deve ser um número inteiro igual ou maior que 18' },
    );
  }

  if (age % 1 !== 0) {
    return res.status(400).json(
      { message: 'O campo \"age\" deve ser um número inteiro igual ou maior que 18' },
    );
  }

  if (age < 18) {
    return res.status(400).json(
      { message: 'O campo \"age\" deve ser um número inteiro igual ou maior que 18' },
    );
  }
  next();
};