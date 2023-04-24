const sgMail = require("@sendgrid/mail");

const sendMail = (mail, name) => {
  sgMail.setApiKey(process.env.Mail_Secret);
  const msg = {
    to: mail,
    from: "vishnusatheeshdev@gmail.com",
    subject: "Welcome to Snap",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Welcome to Snap!</title>
</head>
<body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #F2F2F2; color: #333;">
	<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFF; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 5px; text-align: center;">
		<img src="https://res.cloudinary.com/vishnusatheesh/image/upload/v1682329825/Snap/logo_qroocp.png" alt="Snap Logo" style="max-width: 100%; height: auto; border-radius: 5px;">
		<h1 style="font-size: 32px; margin-bottom: 20px; color:#3a2a90;">Welcome to Snap!</h1>
		<p style="font-size: 16px; line-height: 24px; margin-bottom: 20px;">Dear ${name},</p>
		<p style="font-size: 16px; line-height: 24px; margin-bottom: 20px;">Thank you for registering with Snap! We're thrilled to have you on board.</p>
		<div style="margin-bottom: 20px;">
			<img src="https://res.cloudinary.com/vishnusatheesh/image/upload/v1682330893/Snap/photography_mfdaup.jpg" alt="Welcome Image" style="max-width: 100%; height: auto; border-radius: 5px;">
		</div>
		<p style="font-size: 16px; line-height: 24px; margin-bottom: 20px;">With Snap, you can easily upload your beautiful photos and showcase your talent to the world. Our powerful search and filtering tools allow you to find the perfect photo for your project, and our intuitive interface makes the entire process a breeze.</p>
		<a href="https://www.snap.netlify.app" style="display: inline-block; background-color: #3a2a90; color: #FFF; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-bottom: 20px;">Get Started</a>
		<div style="font-size: 14px; color: #999; margin-top: 20px; text-align: center;">
			<p style="margin: 0;">You are receiving this email because you signed up for an account with Snap. If you did not create an account, please disregard this message.</p>
			<p style="margin: 0;">&copy; 2023 Snap. All rights reserved.</p>
		</div>
	</div>
</body>
</html>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendMail };
