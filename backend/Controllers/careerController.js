import nodemailer from "nodemailer";

export const sendCareerMail = async (req, res) => {
  const { firstname, lastname, email, contactnumber, message } = req.body;
  const resumeFile = req.file;
  console.log(firstname)
  const fullName = `${firstname} ${lastname}`;

  if (!firstname || !lastname || !email || !contactnumber || !resumeFile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: email, // use your verified email
      to: process.env.MAIL_USER,
      subject: `New Career Form Submission from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nContact: ${contactnumber}\nMessage: ${message}`,
      attachments: [
        {
          filename: resumeFile.originalname,
          content: resumeFile.buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mail sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ message: "Failed to send mail" });
  }
};
