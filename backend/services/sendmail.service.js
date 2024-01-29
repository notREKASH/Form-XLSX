const nodemailer = require("nodemailer");
const { formattedDate, formattedTime } = require("../helpers/dateTime");

// This is the configuration for nodemailer to use Mailtrap.io as the SMTP server

// const transport = nodemailer.createTransport({
//   host: "live.smtp.mailtrap.io",
//   port: 587,
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
// });

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cfdfa0b7e8cf4b",
    pass: "8b23ab4d165a3a",
  },
});

// This is the configuration for nodemailer to use Mailgun as the SMTP server

async function sendArticleForm(data) {
  try {
    const { firstName, lastName, cgv } = data.body;
    const attachment = data.file;

    const date = formattedDate;
    const timestamp = formattedTime;

    const message = {
      from: "no-reply@chezvalerie-videgrenier.fr",
      to: "benmehal.joris@gmail.com",
      subject: `Fiche article de ${firstName} ${lastName}`,
      html: `
      <p>Fiche article de ${firstName} ${lastName}</p>
      <p>Envoyé le ${date} à ${timestamp} depuis le formulaire de fiche article</p>
      <p>Les CGV ont été acceptées: ${cgv}</p>
      <p>La fiche article est en pièce jointe</p>
      `,
      text: `
        Fiche article de ${firstName} ${lastName}
        Envoyé le ${date} à ${timestamp} depuis le formulaire de fiche article
        Les CGV ont été acceptées: ${cgv}
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
    throw new Error(error);
  }
}

module.exports = {
  sendArticleForm,
};
