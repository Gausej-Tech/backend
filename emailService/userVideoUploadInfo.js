
const { transporter } = require("./nodemailerConfig");

const sendVideoUploadEmailToUser = async (name, toEmail, videoTitle) => {
  try {
    const mailOptions = {
      from: `"Gausej" <${process.env.ADMIN_EMAIL}>`,
      to: toEmail,
      subject: "Your Video Has Been Successfully Submitted - Gausej",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0056b3;">Hello ${name},</h2>
          <p>Thank you for submitting your video titled <strong>"${videoTitle}"</strong> on Gausej.</p>
          <p>We have received your upload and it is currently being processed. Once processed, it will be available on your profile and visible to others on the platform.</p>
          <p>If you have any questions or need support, feel free to contact us at <a href="mailto:support@gausej.com">support@gausej.com</a>.</p>
          <p style="margin-top: 20px;">Thanks again for contributing to the Gausej community!</p>
          <p style="margin-top: 20px;">Best regards,<br/>The GausejTech Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Upload notice email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending upload email:", error);
    return false;
  }
};



const sendVideoApprovalRequestToAdmin = async (videoTitle, uploaderName) => {
  try {
    const mailOptions = {
      from: `"GausejTech System" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Video Pending Approval",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #c0392b;">Admin Alert</h2>
          <p><strong>${uploaderName}</strong> has uploaded a new video titled <strong>${videoTitle}</strong>.</p>
          <p>Please review and approve it from the admin panel.</p>
          <p style="margin-top: 20px;">Thanks,<br/>GausejTech System</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Admin approval request email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending admin email:", error);
    return false;
  }
};


const sendVideoApprovedEmailToUser = async (name, toEmail, videoTitle) => {
  try {
    const mailOptions = {
      from: `"GausejTech" <${process.env.ADMIN_EMAIL}>`,
      to: toEmail,
      subject: "Your Video Has Been Approved - GausejTech",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #28a745;">Hello ${name},</h2>
          <p>Good news! Your video <strong>${videoTitle}</strong> has been reviewed and approved.</p>
          <p>It is now live and visible to everyone.</p>
          <p style="margin-top: 20px;">Thanks,<br/>The GausejTech Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Approval confirmation email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending approval email:", error);
    return false;
  }
};

const sendVideoRejectedEmailToUser = async (name, toEmail, videoTitle, reason) => {
  try {
    const mailOptions = {
      from: `"GausejTech" <${process.env.ADMIN_EMAIL}>`,
      to: toEmail,
      subject: "Your Video Was Rejected - GausejTech",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #e74c3c;">Hello ${name},</h2>
          <p>We regret to inform you that your video titled <strong>${videoTitle}</strong> has been rejected by the admin team.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>If you believe this was a mistake, feel free to contact our support or try re-uploading with necessary corrections.</p>
          <p style="margin-top: 20px;">Thanks,<br/>The GausejTech Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Rejection email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending rejection email:", error);
    return false;
  }
};


module.exports = {
sendVideoApprovedEmailToUser,
sendVideoApprovalRequestToAdmin,
sendVideoUploadEmailToUser,
sendVideoRejectedEmailToUser
}
