const sgMail = require('@sendgrid/mail');

const sendMail = (msg, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send(msg)
    .then((response) => {
      res.json({
        status: response[0].statusCode,
        message: response[0].headers,
      });
    })
    .catch((error) => {
      res.status(500).send({
        status: 500,
        success: false,
        message: 'Failed to send mail',
        error: error.message,
      });
    });
};

module.exports = sendMail;
