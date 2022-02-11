const sgMail = require("@sendgrid/mail");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;

class Sender {
  async send(msg) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: SENDGRID_SENDER_EMAIL });
  }
}

module.exports = Sender;
