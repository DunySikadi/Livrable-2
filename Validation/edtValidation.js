const joi = require("joi");

const edtValidation = (body) => {
  const EdtSchema = joi.object({
    date: joi.date().required(),
    slotNumber: joi.number().required(),
    teaching: joi.string().min(3).max(40).required(),
    typeOfSession: joi.string().max(6).required(),
    teacher: joi.string().min(3).max(15).required(),
    group: joi.string().max(10).required(),
    room: joi.number().not(205).required(),
  });
  return EdtSchema.validate(body);
};

module.exports = edtValidation;
