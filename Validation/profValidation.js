const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const profValidation = (body) => {
  const profSchema = joi.object({
    lastname: joi.string().required(),
    firstname: joi.string().required(),
    office: joi.number().required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(2)
      .minOfLowercase(2)
      .minOfUppercase(2)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .required(),
  });
  return profSchema.validate(body);
};

module.exports = profValidation;
