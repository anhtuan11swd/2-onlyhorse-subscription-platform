import { render } from "@react-email/render";
import ReceiptEmail from "@/emails/ReceiptEmail";
import WelcomeEmail from "@/emails/WelcomeEmail";
import {
  getEmailConfig,
  getGmailTransport,
  isProduction,
  resend,
} from "@/lib/resend";

export async function sendWelcomeEmail(
  customerName: string,
  plan: string,
  email: string,
) {
  try {
    const config = getEmailConfig();
    const to = email || config.to;
    if (!to) return;

    if (isProduction) {
      await resend.emails.send({
        from: config.from,
        react: WelcomeEmail({ customerName, plan }),
        subject: "Chào mừng bạn đến với OnlyHorse Premium!",
        to,
      });
    } else {
      const transporter = getGmailTransport();
      const html = await render(WelcomeEmail({ customerName, plan }));
      await transporter.sendMail({
        from: `"OnlyHorse" <${config.from}>`,
        html,
        subject: "Chào mừng bạn đến với OnlyHorse Premium!",
        to,
      });
    }
  } catch (error) {
    console.error("Send welcome email failed:", error);
  }
}

export async function sendReceiptEmail(
  customerName: string,
  productName: string,
  price: number,
  orderId: string,
  email: string,
) {
  try {
    const config = getEmailConfig();
    const to = email || config.to;
    if (!to) return;

    if (isProduction) {
      await resend.emails.send({
        from: config.from,
        react: ReceiptEmail({ customerName, orderId, price, productName }),
        subject: "Xác nhận đơn hàng OnlyHorse",
        to,
      });
    } else {
      const transporter = getGmailTransport();
      const html = await render(
        ReceiptEmail({ customerName, orderId, price, productName }),
      );
      await transporter.sendMail({
        from: `"OnlyHorse" <${config.from}>`,
        html,
        subject: "Xác nhận đơn hàng OnlyHorse",
        to,
      });
    }
  } catch (error) {
    console.error("Send receipt email failed:", error);
  }
}
