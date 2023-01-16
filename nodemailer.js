const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mina12@ethereal.email',
            pass: 'WR2B8PcgVSbS2uDWPz'
        }
    },
    {
        from: 'Mailer Test <maia49@ethereal.email>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer
//
