import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `http://localhost:8080/verify-email?token=${verificationToken}`;
  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Xác nhận đăng ký tài khoản',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Cảm ơn bạn đã đăng ký!</h1>
        <p>Vui lòng nhấp vào nút bên dưới để xác nhận email của bạn:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 10px 20px; background-color: #2563eb; 
                  color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
          Xác nhận email
        </a>
        <p style="color: #6b7280; font-size: 0.9rem;">
          Link sẽ hết hạn sau 24 giờ. Nếu bạn không yêu cầu email này, vui lòng bỏ qua.
        </p>
      </div>
    `
  };
  try {
    // Test kết nối trước khi gửi
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Không thể gửi email xác nhận: ${error.message}`);
  }
};
export const sendOrderEmail = async (email, order) => {
  const confirmUrl = `http://localhost:8080/orders/confirm-email?orderId=${order._id}`;
  try {
    const mailOptions = {
      from: `Shop ABC 👕 <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Xác nhận đơn hàng của bạn',
      html: `
        <h2>Xin chào ${order.shippingInfo.fullName},</h2>
        <p>Chúng tôi đã nhận được đơn hàng của bạn</p>
        <p><strong>Tổng tiền:</strong> ${order.totalPrice.toLocaleString()} VND</p>
        <p>Địa chỉ giao hàng: ${order.shippingInfo.address}</p>
        <a href="${confirmUrl}" style="padding:10px 15px;background:#28a745;color:#fff;text-decoration:none;">
          Xác nhận đơn hàng
        </a>
        <p>Nếu không phải bạn, vui lòng bỏ qua email này.</p>
      `
    };

    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email xác nhận đơn hàng đã được gửi!', info.messageId);
  } catch (err) {
    console.error('❌ Gửi email xác nhận đơn hàng thất bại:', err);
  }
};
