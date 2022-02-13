const Joi = require("joi");

const updateBalanceSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i)),
  balance: Joi.number().optional(),
  password: Joi.string().pattern(
    /(?=.*[0-9])(?=.*[!@#-$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/
  ),
});

const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};

const validateUpdateBalance = async (req, res, next) => {
  try {
    await updateBalanceSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

module.exports = { validateUpdateBalance, validateId };
