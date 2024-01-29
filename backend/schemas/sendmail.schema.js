const Joi = require("joi");

const sendmailSchema = Joi.object({
  lastName: Joi.string().required().messages({
    "string.empty": "Le nom est obligatoire",
    "string.max": "Le nom ne doit pas dépasser 20 caractères",
  }),
  firstName: Joi.string().required().messages({
    "string.empty": "Le prénom est obligatoire",
    "string.max": "Le prénom ne doit pas dépasser 20 caractères",
  }),
  cgv: Joi.boolean().required().valid(true).messages({
    "any.required": "Les CGV doivent être acceptées",
    "any.only": "Les CGV doivent être acceptées",
  }),
});

module.exports = sendmailSchema;
