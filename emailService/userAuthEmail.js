const { transporter } = require("./nodemailerConfig");


const sendOtpEmail = async (name, toEmail, otp) => {
  try {
    const mailOptions = {
      from: `"GausejTech" <${process.env.ADMIN_EMAIL}>`,
      to: toEmail,
      subject: "Your OTP for Password Reset - GausejTech",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0056b3;">Hello ${name},</h2>
          <p>You recently requested to reset your password for your GausejTech account.</p>
          <p>Please use the following OTP to reset your password:</p>
          <div style="
            font-size: 24px;
            font-weight: bold;
            background: #f0f0f0;
            padding: 10px;
            display: inline-block;
            margin: 15px 0;
            border-radius: 5px;
          ">${otp}</div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p style="margin-top: 20px;">Thanks,<br/>The GausejTech Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};


module.exports = { sendOtpEmail };
