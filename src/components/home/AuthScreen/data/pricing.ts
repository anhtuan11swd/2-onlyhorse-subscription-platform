export interface PricingTier {
  annualPrice: number;
  badge?: string;
  description: string;
  features: string[];
  highlighted: boolean;
  monthlyPrice: number;
  name: string;
}

export const tiers: PricingTier[] = [
  {
    annualPrice: 90000000,
    description: "Dành cho người mới bắt đầu khám phá",
    features: ["Xem video cơ bản", "Bài viết chăm sóc ngựa", "Cộng đồng"],
    highlighted: false,
    monthlyPrice: 9000000,
    name: "Cơ bản",
  },
  {
    annualPrice: 190000000,
    badge: "Phổ biến nhất",
    description: "Trải nghiệm đầy đủ nhất",
    features: [
      "Toàn bộ video Premium",
      "Livestream độc quyền",
      "Hướng dẫn 1-1",
      "Tải nội dung HD",
    ],
    highlighted: true,
    monthlyPrice: 19000000,
    name: "Cao cấp",
  },
  {
    annualPrice: 490000000,
    description: "Truy cập trọn đời",
    features: [
      "Tất cả quyền lợi Premium",
      "Nội dung độc quyền",
      "Ưu đãi sự kiện",
      "Hỗ trợ VIP",
    ],
    highlighted: false,
    monthlyPrice: 49000000,
    name: "Vĩnh viễn",
  },
];
