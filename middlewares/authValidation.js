const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

 const validateAuth = async (req, res,next) => {
    try {
         await authSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({message: `Field ${err.message.replace(/"/g, '')}` })
    }
     next();
};  


module.exports = validateAuth;

