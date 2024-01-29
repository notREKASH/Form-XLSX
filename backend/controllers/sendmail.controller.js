const sendmailService = require("../services/sendmail.service");

exports.sendmail = async (req, res) => {
  try {
    await sendmailService.sendArticleForm(req);
    res.status(200).json({
      status: "success",
      message: "La fiche article a bien été envoyé",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        "Une erreur est survenue lors de l'envoi de la fiche article, veuillez me contactez au 06 33 67 77 81",
    });
  }
};
