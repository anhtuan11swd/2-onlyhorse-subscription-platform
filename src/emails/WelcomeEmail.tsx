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

interface WelcomeEmailProps {
  customerName: string;
  plan: string;
}

export default function WelcomeEmail({
  customerName,
  plan,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Chào mừng bạn đến với OnlyHorse Premium!</Preview>
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
            Chào mừng, {customerName}! 🎉
          </Heading>
          <Text style={{ color: "#333", fontSize: "16px", lineHeight: "1.5" }}>
            Cảm ơn bạn đã đăng ký gói <strong>{plan}</strong>. Bạn đã có quyền
            truy cập toàn bộ nội dung Premium của OnlyHorse.
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
              Gói: <strong>{plan}</strong>
            </Text>
            <Text
              style={{ color: "#555", fontSize: "14px", margin: "8px 0 0" }}
            >
              Trạng thái:{" "}
              <strong style={{ color: "#22c55e" }}>Hoạt động</strong>
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
