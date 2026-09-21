const nodemailer = require('nodemailer');

function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your regular password)
    },
  });
}

async function sendOrderConfirmation(order) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('⚠️  Email not configured (EMAIL_USER/EMAIL_PASS missing) — skipping confirmation email.');
    return;
  }

  const itemsHtml = (order.items || []).map(item => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;">${item.title || 'Product'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:center;">${item.size || '-'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:center;">${item.qty || 1}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">${item.price || ''}</td>
    </tr>
  `).join('');

  const shippingMethod = order.shipping?.shippingMethod === 'next-day'
    ? 'Next Day Delivery (PKR 570)'
    : 'Standard Delivery — 4–8 working days (PKR 240)';

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#1c1c1c;padding:32px;text-align:center;">
      <h1 style="color:#fff;letter-spacing:6px;font-size:26px;margin:0;font-weight:300;">KHAADI</h1>
      <p style="color:#aaa;margin:10px 0 0;font-size:13px;letter-spacing:2px;">ORDER CONFIRMATION</p>
    </div>

    <!-- Body -->
    <div style="padding:36px;">
      <h2 style="font-size:17px;font-weight:400;letter-spacing:2px;margin-top:0;">THANK YOU FOR YOUR ORDER!</h2>
      <p style="color:#555;font-size:14px;line-height:1.7;margin-bottom:28px;">
        Hi <strong>${order.shipping?.firstName || ''}</strong>, your order has been placed successfully.
        Use the tracking ID below to track your delivery status at any time.
      </p>

      <!-- Tracking ID box -->
      <div style="background:#f8f8f8;border:2px solid #1c1c1c;border-radius:8px;padding:22px;text-align:center;margin-bottom:32px;">
        <p style="margin:0 0 8px;font-size:11px;color:#888;letter-spacing:3px;">YOUR TRACKING ID</p>
        <p style="margin:0;font-size:26px;font-weight:700;color:#1c1c1c;letter-spacing:4px;">${order.orderNumber}</p>
        <p style="margin:10px 0 0;font-size:12px;color:#888;">Keep this ID to track your order</p>
      </div>

      <!-- Order items -->
      <h3 style="font-size:12px;letter-spacing:2px;margin-bottom:12px;color:#333;">ORDER DETAILS</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:16px;">
        <thead>
          <tr style="background:#f4f4f4;">
            <th style="padding:10px 12px;text-align:left;font-weight:600;font-size:11px;letter-spacing:1px;">ITEM</th>
            <th style="padding:10px 12px;text-align:center;font-weight:600;font-size:11px;letter-spacing:1px;">SIZE</th>
            <th style="padding:10px 12px;text-align:center;font-weight:600;font-size:11px;letter-spacing:1px;">QTY</th>
            <th style="padding:10px 12px;text-align:right;font-weight:600;font-size:11px;letter-spacing:1px;">PRICE</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <!-- Totals -->
      <div style="border-top:2px solid #eee;padding-top:16px;margin-bottom:24px;">
        <table style="width:100%;font-size:13px;">
          <tr><td style="padding:4px 0;color:#666;">Subtotal</td><td style="text-align:right;color:#666;">PKR ${(order.subtotal||0).toLocaleString()}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Shipping</td><td style="text-align:right;color:#666;">PKR ${(order.shippingCost||0).toLocaleString()}</td></tr>
          <tr><td style="padding:8px 0 0;font-weight:700;font-size:15px;">TOTAL</td><td style="text-align:right;font-weight:700;font-size:15px;padding-top:8px;">PKR ${(order.total||0).toLocaleString()}</td></tr>
        </table>
      </div>

      <!-- Shipping info -->
      <div style="background:#f9f9f9;border-radius:6px;padding:18px;font-size:13px;line-height:1.8;margin-bottom:24px;">
        <strong style="letter-spacing:1px;">SHIPPING TO</strong><br>
        ${order.shipping?.firstName || ''} ${order.shipping?.lastName || ''}<br>
        ${order.shipping?.street || ''}<br>
        ${order.shipping?.city || ''}, ${order.shipping?.state || ''}, ${order.shipping?.country || 'Pakistan'}<br>
        ${order.shipping?.mobile || ''}<br><br>
        <strong>Shipping Method:</strong> ${shippingMethod}<br>
        <strong>Payment:</strong> ${(order.paymentMethod||'cod').toUpperCase()} — ${order.paymentMethod === 'cod' ? 'Pay on delivery' : 'Prepaid'}
      </div>

      <p style="font-size:13px;color:#555;text-align:center;">
        Questions? Reply to this email and our team will help you.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f4f4f4;padding:20px;text-align:center;font-size:11px;color:#999;letter-spacing:1px;">
      <p style="margin:0;">© ${new Date().getFullYear()} KHAADI STORE — ALL RIGHTS RESERVED</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Khaadi Store" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: `Order Confirmed ✓  |  Tracking ID: ${order.orderNumber}  |  Khaadi`,
      html,
    });
    console.log(`✅ Confirmation email sent → ${order.email}`);
  } catch (err) {
    console.error(`❌ Email failed (non-blocking): ${err.message}`);
  }
}

module.exports = { sendOrderConfirmation };
