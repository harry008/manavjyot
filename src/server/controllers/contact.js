import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: process.env.MAILGUN_SKEY,
    domain: process.env.MAILGUN_USER
  }
};

const transporter = nodemailer.createTransport(mg(auth));

export default function contact(req, res) {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('message', 'Message cannot be blank').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        return res.json({
            error: true,
            errors
        });
    }

    const name = req.body.name;
    const fromEmail = req.body.email;
    const message = req.body.message;

    transporter.sendMail({
        from: fromEmail,
        to: process.env.SITE_EMAIL, // An array if you have multiple recipients.
        subject: `Message from ${name}!`,
        // 'h:Reply-To': fromEmail,
        //You can use "html:" to send HTML email content. It's magic!
        html: `
<h1>Hey message from ${name}</h1>

${message}`
    }, (err, info) => {
        if (err) {
            console.log('Error: ' + err);
            res.status(500).json({
                error: true,
                message: 'Internal Server error'
            });
        } else {
            console.log('Response: ' + info);
            res.status(201).json({
                error: false,
                info,
                message: 'Your message has been sent. We will reach to you soon!'
            });
        }
    });
}
