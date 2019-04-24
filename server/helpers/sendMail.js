import 'dotenv/config';
import nodemailer from 'nodemailer';

/**
  * @description - This function sends an email
  * @param {object} options - It contains the sender, destination,
  * subject of the mail, the html and text version of the mail content
  * @returns {void} - It doesn't return any value
  */
const sendMail = (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  transport.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export default sendMail;
