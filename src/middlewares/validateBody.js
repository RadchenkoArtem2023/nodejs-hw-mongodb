const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({
        status: 'error',
        message,
      });
    }

    next();
  };
};

module.exports = validateBody;
