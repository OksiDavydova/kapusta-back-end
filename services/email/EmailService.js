const Mailgen = require("mailgen");
const linkType = require("./linkType");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    this.link = linkType(env);
  }

  createEmailTemplate(username, verificationToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Kapu$ta",
        link: "https://vigorous-hawking-9bd900.netlify.app",
        logo: "https://i.ibb.co/Lx1S8Dr/logo.png",
        logoHeight: "40px",
      },
    });

    const email = {
      body: {
        name: username,
        intro: "Welcome to Kapu$ta!",
        action: {
          instructions: "To get started with Kapu$ta, please click here:",
          button: {
            color: "#FB7C2F",
            text: "Confirm your account",
            link: `${this.link}/api/v1/users/verify/${verificationToken}`,
          },
        },
      },
    };

    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, verificationToken) {
    const emailBody = this.createEmailTemplate(email, verificationToken);

    const msg = {
      to: email,
      subject: "Confirm email on Kapu$ta",
      html: emailBody,
    };

    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

module.exports = EmailService;
