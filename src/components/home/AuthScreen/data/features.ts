export interface Feature {
  badge: string;
  description: string;
  image: string;
  title: string;
}

export const features: Feature[] = [
  {
    badge: "Phổ biến",
    description:
      "Học cách chăm sóc ngựa chuyên nghiệp qua các video chất lượng cao.",
    image: "/gifs/gif1.gif",
    title: "Mẹo Chăm Sóc Ngựa",
  },
  {
    badge: "Cao cấp",
    description: "Cải thiện kỹ năng cưỡi ngựa qua các hướng dẫn từ chuyên gia.",
    image: "/gifs/gif2.gif",
    title: "Kỹ Thuật Cưỡi Ngựa",
  },
  {
    badge: "Mới",
    description:
      "Thưởng thức những khoảnh khắc hậu trường độc quyền từ trang trại.",
    image: "/gifs/gif3.gif",
    title: "Phong Cách Trang Trại",
  },
];
