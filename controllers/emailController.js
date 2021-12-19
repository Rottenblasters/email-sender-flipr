const nodemailer = require("nodemailer");

function emailController() {
  return {
    async send(req, res) {
      const { to, email_body } = req.body;

      var resBody = {
        success: "temp",
        message: "temp",
      };

      // Validate request
      if (!to || !email_body) {
        resBody.success = false;
        resBody.message = "All the fields are not provided";
        return res.status(400).send(resBody);
      }

      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "h4npjnqnqfjbuxuc@ethereal.email",
          pass: "MeqVG7wRm87Veq9Z7e",
        },
      });

      // Message object
      let message = {
        from: "Test Email <sender@example.com>",
        to: `Recipient <${to}>`,
        subject: "Test Email ✔",
        text: email_body,
        html: `<p${email_body}</p>`,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
          resBody.success = false;
          resBody.message = "Error occurred: " + err.message;
          return res.status(500).send(resBody);
        }

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        resBody.success = true;
        resBody.message = "Email sent successfullly";
        return res.status(200).send(resBody);
      });
    },
  };
}

module.exports = emailController;
