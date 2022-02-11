const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;

    switch (env) {
      case "development":
        this.link = "http://localhost:3001";
        break;
      case "production":
        this.link = "https://api-kapusta.herokuapp.com";
        break;
      default:
        this.link = "http://localhost:3002";
        break;
    }
  }

  createEmailTemplate(username, verificationToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Kapusta",
        link: this.link,
        logo: "https://i.ibb.co/Lx1S8Dr/logo.png",
        logoHeight: "40px",
      },
    });

    const email = {
      body: {
        name: username,
        intro: "Welcome to Kapusta!",
        action: {
          instructions: "To get started with Kapusta, please click here:",
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
      subject: "Verify email",
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
