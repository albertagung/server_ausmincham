// Define nodemailer
const nodemailer = require('nodemailer')

// Nodemailer send email
nodeMailFunc = (emailData) => {
  return new Promise ((resolve, reject) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASS // generated ethereal password
        }
      });
      // setup email emailData with unicode symbols
      let mailOptions = {
        from: emailData.emailSender, // sender address
        to: emailData.emailReceiver, // list of receivers
        subject: `New Inquiry - from: ${emailData.emailReceiver}` , // Subject line
        text: emailData.emailText, // plain text body
        html: `
        	<p>Dear Ausmincham Team, you have a new inquiry</p>
					<p><b>Inquiry Sender Name:</b> ${emailData.inquirySenderName}</p>
					<p><b>Inquiry Sender Email:</b> ${emailData.emailReceiver}</p>
					<p><b>Inquiry Message:</b> ${emailData.inquiryMessage}</p>
					<p>Thank you</p>
        ` // html body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // Resolve
        resolve('Message sent: %s', info.messageId)
      });
    });
  })
}

// Send order cancelled email
sendEmail = (req, res) => {
	// Define email data
	let emailData = req.body
	// Send data to nodemailerController
	nodeMailFunc(emailData)
	.then((response) => {
		res.status(200).send(response)
	})
	.catch((err) => {
		console.log(err)
		res.status(500).send(err)
	})
}

module.exports = {
	sendEmail
}