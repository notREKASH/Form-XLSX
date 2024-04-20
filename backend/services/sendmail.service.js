const nodemailer = require("nodemailer");
const { formattedDate, formattedTime } = require("../helpers/dateTime");
require("dotenv").config();

// This is the configuration for nodemailer to use Mailtrap.io as the SMTP server

const transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587 || 2525 || 25,
  auth: {
    user: `${process.env.MAILTRAP_USERNAME}`,
    pass: `${process.env.MAILTRAP_PASSWORD}`,
  },
});

// This is the configuration for nodemailer to use Mailgun as the SMTP server

async function sendArticleForm(data) {
  try {
    const { firstName, lastName, email, countryCode, phone, cgv } = data.body;
    const attachment = data.file;

    const date = formattedDate;
    const timestamp = formattedTime;

    const message = {
      from: "no-reply@chezvalerie-videgrenier.fr",
      to: "magasin@chezvalerie-videgrenier.fr",
      replyTo: email,
      subject: `Fiche article de ${firstName} ${lastName}`,
      html: `
      <p>Fiche article de ${firstName} ${lastName}</p>
      <p>Information de contact: ${email} - ${countryCode} ${phone}</p>
      <p>Envoyé le ${date} à ${timestamp} depuis le formulaire de fiche article</p>
      <p>Le client atteste sur l’honneur que les informations renseignées sont exactes et qu'il est responsables des erreurs de saisie: ${cgv}</p>
      <p>La fiche article est en pièce jointe</p>
      `,
      text: `
        Fiche article de ${firstName} ${lastName}
        Information de contact: ${email} - ${countryCode} ${phone}
        Envoyé le ${date} à ${timestamp} depuis le formulaire de fiche article
        Le client atteste sur l’honneur que les informations renseignées sont exactes et qu'il est responsables des erreurs de saisie: ${cgv}
        La fiche article est en pièce jointe
        `,
      attachments: [
        {
          filename: attachment.originalname,
          content: attachment.buffer,
        },
      ],
    };

    await transport.sendMail(message);
  } catch (error) {
    throw new Error(
      "Impossible d'envoyer le mail, contactez moi au 06 33 67 77 81"
    );
  }
}

module.exports = {
  sendArticleForm,
};
