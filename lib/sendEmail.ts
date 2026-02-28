import nodemailer from "nodemailer";

export const sendEmail = async (email:string, subject:string, html:string) =>{
    const transporter = nodemailer.createTransport({
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"SUpport Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html,
    });
};

