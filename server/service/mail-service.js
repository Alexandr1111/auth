const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })
    }

    // const testAccount = nodemailer.createTestAccount((err, account) => {
    //
    // });

// <a href="${link}">${link}</a>
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
                </div>>
                  `
        }, (error, info) => {
            if (error) {
                return console.log(error.message);
            }

            // console.log(nodemailer.getTestMessageUrl(info));

            console.log('success');
        })

        // await this.transporter.sendMail({
        //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
        //     to: "grachev588@gmail.com", // list of receivers
        //     // subject: "Hello ✔", // Subject line
        //     subject: 'Активация аккаунта на ' + process.env.API_URL,
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // }).then(info => {
        //     return console.log(nodemailer.getTestMessageUrl(info))
        // }).catch(e => console.log(e, 'hh'));
    }
}

module.exports = new MailService();