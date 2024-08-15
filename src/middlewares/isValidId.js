const { isValidObjectId } = require('mongoose');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 400, message: 'Invalid ID' });
  }
  next();
};

module.exports = isValidId;
