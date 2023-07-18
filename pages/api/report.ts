import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { location, incidentType, description, when, timeline, studentsInvolved } = req.body;


      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Incident Report',
        text: `
          Location: ${location}
          Incident Type: ${incidentType}
          Description: ${description}
          When: ${when}
          Timeline: ${timeline}
          Students Involved: ${studentsInvolved}
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Report submitted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while processing the report.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
