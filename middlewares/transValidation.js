const Joi = require('joi');
const { Categories } = require("../lib/constants");

const createTransactionSchema = Joi.object({
    date: Joi.string().min(8).pattern(new RegExp(/[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/)),
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