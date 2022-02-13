const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i)),
  password: Joi.string().pattern(
    /(?=.*[0-9])(?=.*[!@#-$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/
  ),
});

const validateAuth = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
};

module.exports = validateAuth;
