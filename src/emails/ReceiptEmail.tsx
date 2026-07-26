import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ReceiptEmailProps {
  customerName: string;
  orderId: string;
  price: number;
  productName: string;
}

export default function ReceiptEmail({
  customerName,
  productName,
  price,
  orderId,
}: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Cảm ơn bạn đã mua hàng tại OnlyHorse!</Preview>
      <Body
        style={{
          background: "#f6f6f6",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            background: "#fff",
            borderRadius: "8px",
            maxWidth: "600px",
            padding: "40px",
          }}
        >
          <Heading
            style={{ color: "#00B0F0", fontSize: "24px", marginBottom: "16px" }}
          >
            Cảm ơn bạn, {customerName}! 🛍️
          </Heading>
          <Text style={{ color: "#333", fontSize: "16px", lineHeight: "1.5" }}>
            Đơn hàng của bạn đã được xác nhận.
          </Text>
          <Section
            style={{
              background: "#f0f9ff",
              borderRadius: "6px",
              margin: "24px 0",
              padding: "16px",
            }}
          >
            <Text style={{ color: "#555", fontSize: "14px", margin: 0 }}>
              Mã đơn hàng: <strong>{orderId}</strong>
            </Text>
            <Text
              style={{ color: "#555", fontSize: "14px", margin: "8px 0 0" }}
            >
              Sản phẩm: <strong>{productName}</strong>
            </Text>
            <Text
              style={{ color: "#555", fontSize: "14px", margin: "8px 0 0" }}
            >
              Tổng tiền:{" "}
              <strong>
                {(price / 100).toLocaleString("vi-VN", {
                  currency: "VND",
                  style: "currency",
                })}
              </strong>
            </Text>
          </Section>
          <Hr style={{ borderColor: "#eee", margin: "24px 0" }} />
          <Text
            style={{ color: "#888", fontSize: "14px", textAlign: "center" }}
          >
            &copy; {new Date().getFullYear()} OnlyHorse. Tất cả quyền được bảo
            lưu.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
