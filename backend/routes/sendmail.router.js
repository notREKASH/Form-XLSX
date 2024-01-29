const express = require("express");
const sendmailController = require("../controllers/sendmail.controller");
const upload = require("../middleware/multer");
const validateRequest = require("../middleware/validateRequest");
const sendmailSchema = require("../schemas/sendmail.schema");

const router = express.Router();

router.post(
  "/contact",
  upload.single("attachment"),
  validateRequest(sendmailSchema),
  sendmailController.sendmail
);

module.exports = router;
