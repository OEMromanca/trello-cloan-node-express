const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const pug = require("pug");
const path = require("path");
const fs = require("fs");

dotenv.config();

const generateEmailTemplate = (link) => {
  const templatePath = path.join(__dirname, "emailTemplate.pug");
  const compiledTemplate = pug.compileFile(templatePath);

  return compiledTemplate({ link });
};

const sendEmail = async (email, subject, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS,
      },
      tls: {
        key: fs.readFileSync(path.join(__dirname, "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
      },
    });

    const emailTemplate = generateEmailTemplate(link);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: emailTemplate,
    });
  } catch (error) {
    console.error(error, "Email nebol odoslaný");
  }
};

module.exports = sendEmail;
