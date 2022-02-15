const Joi = require("joi");
const ExpressError = require("./expressError");

const validateJoiSchema = (req, res, next) => {
  const questionsSchema = Joi.object({
    tags: Joi.array().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    votes: Joi.number(),
  }).required();
  const { error } = questionsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" , ");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = validateJoiSchema;
