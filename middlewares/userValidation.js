const Joi = require('joi');

const updateBalanceSchema = Joi.object({
    email: Joi.string().email().required(),
    balance: Joi.number().optional(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const validateId = async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
       return res.status(400).json({ message: 'Invalid ObjectId' })
   }
    next()
};

const validateUpdateBalance = async (req, res,next) => {
    try {
         await updateBalanceSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({ message: err.message})
    }
     next();
};  

module.exports = {validateUpdateBalance, validateId};