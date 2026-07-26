export interface TeamMember {
  description: string;
  image: string;
  name: string;
  role: string;
}

export const teamList: TeamMember[] = [
  {
    description: "Đam mê ngựa và công nghệ, xây dựng cộng đồng OnlyHorse.",
    image: "/user-placeholder.png",
    name: "John Doe",
    role: "Nhà sáng lập & CEO",
  },
  {
    description: "Chịu trách nhiệm tuyển chọn các video chất lượng cao.",
    image: "/user-placeholder.png",
    name: "Jane Smith",
    role: "Giám đốc Nội dung",
  },
  {
    description: "Xây dựng nền tảng công nghệ vững chắc cho cộng đồng.",
    image: "/user-placeholder.png",
    name: "Mike Johnson",
    role: "Kỹ sư trưởng",
  },
  {
    description: "Cố vấn nội dung với hơn 15 năm kinh nghiệm trong lĩnh vực.",
    image: "/user-placeholder.png",
    name: "Sarah Wilson",
    role: "Chuyên gia ngựa",
  },
];
