import nodemailer from 'nodemailer';

const Email = (user) => {
    return {
        to: user.email,
        firstName: user.name.split(' ')[0],
        from: `GrandFam-Squad <${process.env.EMAIL_FROM}>`,

        newTransport() {
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        },

        async send(subject, text) {
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                text,
            };

            await this.newTransport().sendMail(mailOptions);
        },

        async sendWelcome() {
            const subject = 'Thanks for joining in! 😊';
            const text = `Hi ${this.firstName},Welcome to the GrandFam-Squad Family! 😊 We hope you enjoy your stay. If you have any questions, please feel free to contact us at ${process.env.EMAIL_FROM}.`;
            await this.send(subject, text);
        },

        async sendPasswordReset(url) {
            console.log('hrrrr');
            const subject =
                'Your password reset token (valid for only 10 minutes)';
            const text = `Hi ${this.firstName},Here is your password reset link:${url} This link is only valid for 10 minutes.`;

            await this.send(subject, text);
        },
    };
};

export default Email;
