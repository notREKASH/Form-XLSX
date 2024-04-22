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
  email: Joi.string().email().required().messages({
    "string.empty": "L'email est obligatoire",
    "string.email": "L'email doit être valide",
  }),
  countryCode: Joi.string().required().messages({
    "string.empty": "L'indicatif téléphonique pays est obligatoire",
  }),
  phone: Joi.number().required().messages({
    "number.base": "Le téléphone doit être composé de chiffres",
    "number.empty": "Le téléphone est obligatoire",
    "number.min": "Le téléphone doit être composé de 10 chiffres",
  }),
  cgv: Joi.boolean().required().valid(true).messages({
    "any.required": "Les CGV doivent être acceptées",
    "any.only": "Les CGV doivent être acceptées",
  }),
});

module.exports = sendmailSchema;
