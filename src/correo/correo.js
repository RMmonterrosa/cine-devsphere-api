import nodemailer from 'nodemailer';
import qrcode from 'qrcode';


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Usa `true` para el puerto 465, `false` para otros puertos
    auth: {
        user: "devsphere8@gmail.com",
        pass: "yvtc hapz mhuu snbv", // Usa la contraseña de aplicación
    },
    tls: {
        rejectUnauthorized: false
    }
});


  export const mensaje = async (req, res) => {

    const { to, subject, text } = req.body;

    try {
        // Generar el código QR
        const qrCodeDataUrl = await qrcode.toDataURL(text);


        const mailOptions = {
            from: 'tu-email@gmail.com',
            to: to,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCodeDataUrl.split('base64,')[1],
                    encoding: 'base64'
                }
            ]
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        res.status(200).send('Email enviado con éxito');
    } catch (error) {
        res.status(500).send(error.toString());
    }
}