const Joi = require('joi');
const { Categories } = require("../lib/constants");

const createTransactionSchema = Joi.object({
    date: Joi.string().custom((value) => {
      const dateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
      const isValidDate = dateRegex.test(value);
      if (!isValidDate) {
        return res.status(400).json({ message: "Invalid 'date'. Please, use YYYY-MM-DD string format"});
      }
      return value;
    }),
    description: Joi.string().required(),
    category: Joi.string().required(),
    value: Joi.number().required(),
    income: Joi.boolean().required()
});

const validateCreateTransaction = async (req, res,next) => {
    try {
         await createTransactionSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({ message: err.message})
    }
     next();
};  

module.exports = validateCreateTransaction;