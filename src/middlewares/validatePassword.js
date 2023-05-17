module.exports = (req, res, next) => {
  const { password } = req.body;

  if ([password].includes(undefined)) {
    return res.status(400).json(
      {
        message: 'O campo "password" é obrigatório',
      },
    );
  }
  if (!password || password <= 6) {
    return res.status(400).json(
      {
        message: 'O "password" deve ter pelo menos 6 caracteres',
      },
    );
  }
  next();
};
