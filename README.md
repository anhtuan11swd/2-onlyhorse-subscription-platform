<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/of-logo.svg">
    <img alt="OnlyHorse Logo" src="./public/onlyhorse.png" width="120" height="120">
  </picture>
</p>

<h1 align="center">🐴 OnlyHorse — Nền tảng Nội dung & Subscription cho Cộng đồng Đam mê Cưỡi ngựa</h1>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2.12-black?logo=next.js" alt="Next.js 16.2.12"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.4-blue?logo=react" alt="React 19.2.4"></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-7.9.0-2D3748?logo=prisma" alt="Prisma 7.9.0"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" alt="TypeScript"></a>
  <a href="https://stripe.com/"><img src="https://img.shields.io/badge/Stripe-22.3.2-635BFF?logo=stripe" alt="Stripe 22.3.2"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4"></a>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License MIT">
</p>

<p align="center">
  <em>Nền tảng đăng ký thành viên (subscription) dành riêng cho những người yêu thích bộ môn cưỡi ngựa — cung cấp nội dung video, bài viết chuyên sâu, cửa hàng merch, và công cụ quản lý dành cho admin.</em>
</p>

---

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng nổi bật](#-tính-năng-nổi-bật)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Cài đặt](#-cài-đặt)
  - [Yêu cầu](#yêu-cầu)
  - [Hướng dẫn từng bước](#hướng-dẫn-từng-bước)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Mô hình dữ liệu](#-mô-hình-dữ-liệu)
- [API Routes](#-api-routes)
- [Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [Kiểm thử](#-kiểm-thử)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)
- [Tác giả & Cảm ơn](#-tác-giả--cảm-ơn)

---

## 🎯 Giới thiệu

**OnlyHorse** là một nền tảng subscription (đăng ký thành viên) được xây dựng trên công nghệ **Next.js 16** (App Router) và **React 19**, phục vụ cộng đồng những người đam mê cưỡi ngựa tại Việt Nam. Người dùng có thể:

- Xem nội dung video, bài viết về kỹ thuật cưỡi ngựa, chăm sóc ngựa, dinh dưỡng
- Đăng ký các gói thành viên (Cơ bản / Cao cấp / Vĩnh viễn) để mở khóa nội dung Premium
- Mua sắm hàng hóa, merch liên quan đến bộ môn cưỡi ngựa
- Tương tác với cộng đồng qua bài viết, bình luận, lượt thích

Admin có một dashboard riêng để quản lý nội dung, theo dõi doanh thu, và quản lý cửa hàng.

---

## ✨ Tính năng nổi bật

### 🔐 Xác thực & Bảo mật
- Đăng ký / Đăng nhập bằng email & mật khẩu (mã hóa bcrypt 12 rounds)
- JWT-based session cookie (httpOnly, 7 ngày)
- Validation đầu vào với Zod (chống SQL injection, validate định dạng)
- Blacklist mật khẩu yếu (common passwords), yêu cầu ký tự đặc biệt/chữ hoa/chữ thường/số

### 💳 Thanh toán & Subscription
- Tích hợp **Stripe Checkout** cho cả subscription và mua hàng một lần
- 3 gói thành viên: Cơ bản (9tr/tháng), Cao cấp (19tr/tháng), Vĩnh viễn (49tr/tháng)
- Tùy chọn thanh toán theo tháng hoặc theo năm
- Portal quản lý subscription (hủy, nâng cấp) qua Stripe Billing
- Gửi email xác nhận (Welcome + Hóa đơn) qua Resend (production) hoặc Gmail SMTP (development)

### 📝 Nội dung & Tương tác
- Feed bài viết với hỗ trợ hình ảnh & video (upload qua Cloudinary)
- Gating nội dung Premium: bài viết chỉ hiển thị cho người dùng đã đăng ký
- Hệ thống Like (tim) với optimistic update
- Bình luận trên bài viết
- Masonry grid ảnh đẹp mắt trên trang chủ

### 🛍️ Cửa hàng (Merch Store)
- Danh sách sản phẩm kèm hình ảnh, mô tả, giá (VND)
- Giỏ hàng thanh toán một lần qua Stripe (kèm địa chỉ giao hàng)
- Quản lý tồn kho, lưu trữ sản phẩm
- Admin dashboard: thêm sản phẩm mới, ẩn/hiện sản phẩm

### 📊 Admin Dashboard
- **Analytics**: Thống kê tổng doanh thu, số lượng người đăng ký, giao dịch gần đây
- **Content**: Đăng bài viết mới (caption + media), chọn public/premium
- **Store**: Thêm sản phẩm mới (tên, giá, ảnh), quản lý danh mục

### 🎨 Giao diện
- Thiết kế responsive (sidebar, right panel ẩn trên mobile)
- Hỗ trợ Dark mode / Light mode (next-themes)
- UI Components từ shadcn/ui (button, card, dialog, sheet, tabs, dropdown, tooltip, ...)
- Masonry layout, hiệu ứng zoom ảnh
- Toast notification (sonner)

---

## 🛠 Công nghệ sử dụng

| Nhóm | Công nghệ | Version |
|------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | 16.2.12 |
| **UI Library** | [React](https://react.dev/) | 19.2.4 |
| **Ngôn ngữ** | [TypeScript](https://www.typescriptlang.org/) | ^5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | ^4.3.3 |
| **Database ORM** | [Prisma](https://www.prisma.io/) | ^7.9.0 |
| **Database** | PostgreSQL (qua `@prisma/adapter-pg` + `pg`) | — |
| **Authentication** | [jose](https://github.com/panva/jose) (JWT) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | ^6.2.4 / ^3.0.3 |
| **Thanh toán** | [Stripe SDK](https://stripe.com/docs/api) | ^22.3.2 |
| **Media Upload** | [Cloudinary](https://cloudinary.com/) + [next-cloudinary](https://next-cloudinary.spacejelly.dev/) | ^2.10.0 / ^6.17.5 |
| **Email** | [Resend](https://resend.com/) + [Nodemailer](https://nodemailer.com/) | ^6.18.0 / ^9.0.3 |
| **Email Templates** | [React Email](https://react.email/) | ^1.0.12 |
| **Form Validation** | [Zod](https://zod.dev/) | ^4.4.3 |
| **Data Fetching** | [TanStack React Query](https://tanstack.com/query) | ^5.101.4 |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) | — |
| **Code Quality** | [Biome](https://biomejs.dev/) + ESLint | ^2.4.16 / ^9 |
| **Icons** | [Lucide React](https://lucide.dev/) | ^1.27.0 |
| **React Compiler** | Babel plugin react-compiler | 1.0.0 |

---

## 🏗 Kiến trúc hệ thống

Dưới đây là luồng dữ liệu chính của hệ thống:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │AuthScreen│  │  Feed    │  │  Store   │  │   Dashboard   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       │              │             │                 │          │
│  ┌────▼──────────────▼─────────────▼─────────────────▼──────┐  │
│  │              Client Components (TanStack Query)          │  │
│  └────────────────────────┬─────────────────────────────────┘  │
└───────────────────────────┼─────────────────────────────────────┘
                            │
        ┌───────────────────┼─────────────────────┐
        │                   │                     │
        ▼                   ▼                     ▼
┌───────────────┐  ┌───────────────┐  ┌──────────────────────┐
│  API Routes   │  │ Server Actions│  │  /api/auth/me         │
│  (/api/auth/*)│  │ (use server)  │  │  (session check)      │
│  /api/sign-img│  │ posts/*       │  │                       │
└───────┬───────┘  │ products/*    │  └──────────────────────┘
        │          │ stripe/*      │
        │          │ user/*        │
        │          └───────┬───────┘
        │                  │
┌───────▼──────────────────▼──────────────────────────────────┐
│                    Next.js Server                            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐ │
│  │  Auth    │  │  Stripe  │  │Cloudinary│  │  Validation  │ │
│  │ (jose +  │  │  Checkout│  │ Uploads  │  │   (Zod)     │ │
│  │ bcrypt)  │  │  Billing │  │ Media    │  │             │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────────────┘ │
│       │              │             │                         │
│       └──────────────┼─────────────┘                         │
│                      ▼                                       │
│             ┌────────────────┐                               │
│             │    Prisma      │                               │
│             │   (PostgreSQL) │                               │
│             └────────────────┘                               │
└──────────────────────────────────────────────────────────────┘

                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Stripe  │  │Cloudinary│  │  Resend /│
│   API    │  │   API    │  │ Gmail SMTP│
└──────────┘  └──────────┘  └──────────┘
```

### Luồng xác thực
1. Người dùng đăng nhập → `POST /api/auth/login` → xác minh bcrypt → tạo JWT (HS256) → set httpOnly cookie `"session"` (7 ngày)
2. Mọi request sau đó: `getSession()` đọc cookie → `jose.verify()` → trả về user payload
3. Client gọi `GET /api/auth/me` để lấy thông tin user hiện tại

### Luồng thanh toán
1. User chọn gói → `createSubscriptionCheckout()` → tạo Stripe Checkout Session → redirect
2. Stripe xử lý thanh toán → redirect về `/stripe/success?session_id=...`
3. `verifyCheckoutSession()` → stripe.sessions.retrieve() → cập nhật DB → gửi email

---

## 💻 Cài đặt

### Yêu cầu

- **Node.js** >= 18.18 (khuyến nghị 20.x LTS)
- **Bun** hoặc **npm** / **pnpm** / **yarn**
- **PostgreSQL** database (local hoặc remote)
- Tài khoản **Stripe** (cho thanh toán)
- Tài khoản **Cloudinary** (cho upload media)
- Tài khoản **Resend** (cho email production) — _hoặc Gmail App Password cho dev_

### Hướng dẫn từng bước

#### 1. Clone repository

```bash
git clone https://github.com/your-username/2-onlyhorse-subscription-platform.git
cd 2-onlyhorse-subscription-platform
```

#### 2. Cài đặt dependencies

```bash
# Sử dụng npm
npm install

# hoặc Bun (khuyến nghị)
bun install
```

> Script `postinstall` sẽ tự động chạy `prisma generate` để sinh Prisma Client.

#### 3. Cấu hình biến môi trường

Copy file `.env.example` thành `.env` và điền đầy đủ thông tin:

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/onlyhorse"

# JWT Secret (dùng `openssl rand -base64 32` để sinh)
JWT_SECRET="your-secret-key"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID="price_xxx"
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID="price_xxx"

# Email (Production: Resend)
RESEND_API_KEY="re_..."
RESEND_TEST_EMAIL="test@example.com"

# Email (Development: Gmail SMTP)
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-app-password"
```

#### 4. Khởi tạo database

```bash
# Tạo database PostgreSQL trước, sau đó chạy migration
npx prisma migrate dev --name init
```

#### 5. Tạo seed data (tùy chọn)

Nếu có file seed, chạy:

```bash
npx prisma db seed
```

#### 6. Chạy development server

```bash
# Sử dụng npm
npm run dev

# hoặc Bun
bun dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

---

## 📁 Cấu trúc dự án

```
2-onlyhorse-subscription-platform/
│
├── prisma/
│   └── schema.prisma              # Schema database (PostgreSQL)
│
├── public/                         # Static assets
│   ├── featured/                   # Ảnh featured cho masonry grid
│   ├── hero/                       # Ảnh & logo cho hero section
│   ├── products/                   # Ảnh sản phẩm
│   ├── team/                       # Ảnh đội nhóm
│   ├── gifs/                       # GIF hoạt hình
│   ├── videos/                     # Video nội dung
│   ├── tshirts/                    # Ảnh áo thun (merch)
│   ├── onlyhorse.png               # Brand logo
│   ├── of-logo.svg                 # SVG logo
│   ├── user-placeholder.png        # Avatar mặc định
│   └── noise.svg                   # Background noise texture
│
├── src/
│   ├── actions/                    # Server Actions (use server)
│   │   ├── auth/
│   │   │   └── check-auth-status.ts
│   │   ├── dashboard/
│   │   │   └── getDashboardData.ts
│   │   ├── posts/
│   │   │   ├── post-types.ts
│   │   │   ├── getPostsAction.ts
│   │   │   ├── createPostAction.ts
│   │   │   ├── likePostAction.ts
│   │   │   └── commentOnPostAction.ts
│   │   ├── products/
│   │   │   ├── getProductsAction.ts
│   │   │   ├── addNewProductToStoreAction.ts
│   │   │   └── toggleProductArchive.ts
│   │   ├── stripe/
│   │   │   ├── checkout.ts
│   │   │   ├── verifySession.ts
│   │   │   ├── billingPortal.ts
│   │   │   └── checkProductPaidStatus.ts
│   │   └── user/
│   │       └── updateUserProfileAction.ts
│   │
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Auth pages (login, signup)
│   │   ├── api/                    # API Routes
│   │   │   ├── auth/               # register, login, logout, me
│   │   │   └── sign-image/         # Cloudinary upload signature
│   │   ├── auth/
│   │   │   └── callback/           # Post-login callback page
│   │   ├── dashboard/              # Admin dashboard
│   │   ├── merch/                  # Merch store
│   │   ├── stripe/                 # Success/Cancel pages
│   │   ├── subscription/           # Pricing page
│   │   ├── update-profile/         # Profile editing
│   │   ├── globals.css             # Global styles (Tailwind)
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page / Feed
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui primitives (20+ components)
│   │   ├── home/                   # AuthScreen & marketing components
│   │   ├── dashboard/              # Admin dashboard tabs
│   │   ├── post/                   # Feed, PostCard, Comment
│   │   ├── login-form.tsx          # Login form
│   │   ├── signup-form.tsx         # Signup form
│   │   ├── layout/                 # Sidebar, BaseLayout, RightPanel, Footer
│   │   ├── providers/              # ThemeProvider, QueryProvider
│   │   ├── profile/                # UpdateProfileForm
│   │   ├── decorators/             # RotatedText, UnderlinedText
│   │   ├── media/                  # ZoomedImage, MasonryGrid
│   │   ├── merch/                  # ProductCard
│   │   ├── subscription/           # Subscription components
│   │   └── mode-toggle.tsx         # Dark mode toggle
│   │
│   ├── emails/                     # React Email templates
│   │   ├── WelcomeEmail.tsx        # Email chào mừng sau đăng ký
│   │   └── ReceiptEmail.tsx        # Email hóa đơn mua hàng
│   │
│   └── lib/                        # Utility & service files
│       ├── auth.ts                 # JWT, session, password helpers
│       ├── prisma.ts               # Prisma client singleton
│       ├── stripe.ts               # Stripe SDK + price helpers
│       ├── cloudinary.ts           # Cloudinary config
│       ├── upload.ts               # Upload file to Cloudinary
│       ├── validation.ts           # Zod schemas
│       ├── resend.ts               # Resend SDK + email config
│       ├── send-email.ts           # Send welcome/receipt emails
│       └── utils.ts                # cn() utility
│
├── .env.example                    # Mẫu biến môi trường
├── next.config.ts                  # Next.js config
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind CSS config
├── components.json                 # shadcn/ui config
├── biome.json                      # Biome linter/formatter config
├── AGENTS.md                       # Hướng dẫn cho AI agents
├── CLAUDE.md                       # Hướng dẫn cho Claude
└── package.json
```

---

## 🗄 Mô hình dữ liệu

Hệ thống sử dụng **PostgreSQL** với **Prisma ORM** làm tầng giao tiếp database. Dưới đây là 7 models chính:

### User
| Trường | Kiểu | Ghi chú |
|--------|------|---------|
| `id` | String (CUID) | Khóa chính |
| `email` | String (unique) | Email đăng nhập |
| `name` | String? | Tên hiển thị |
| `password` | String | Mật khẩu đã hash (bcrypt) |
| `image` | String? | URL avatar |
| `role` | String (default: `"user"`) | Phân quyền (`"admin"` / `"user"`) |
| `customerId` | String? (unique) | ID Stripe Customer |
| `isSubscribed` | Boolean (default: false) | Trạng thái đăng ký |

### Subscription
| Trường | Kiểu | Ghi chú |
|--------|------|---------|
| `id` | String (CUID) | Khóa chính |
| `userId` | String (unique) | FK → User |
| `stripeSubscriptionId` | String (unique) | ID Stripe Subscription |
| `planId` | String | ID gói |
| `status` | String | `"active"`, `"canceled"`, ... |
| `currentPeriodStart` | DateTime | |
| `currentPeriodEnd` | DateTime | |

### Post
| Trường | Kiểu | Ghi chú |
|--------|------|---------|
| `id` | String (CUID) | Khóa chính |
| `userId` | String | FK → User |
| `caption` | String? | Nội dung bài viết |
| `mediaUrl` | String? | URL media (ảnh/video) |
| `publicId` | String? | Cloudinary public ID |
| `mediaType` | String? | `"image"` / `"video"` |
| `isPublic` | Boolean (default: false) | `true`: ai cũng xem, `false`: chỉ subscriber |

### Product
| Trường | Kiểu | Ghi chú |
|--------|------|---------|
| `id` | String (CUID) | Khóa chính |
| `name` | String | Tên sản phẩm |
| `description` | String? | Mô tả |
| `image` | String? | Ảnh sản phẩm |
| `price` | Float | Giá (VND) |
| `inventory` | Int | Tồn kho |
| `archived` | Boolean (default: false) | Ẩn sản phẩm |

### Order
| Trường | Kiểu | Ghi chú |
|--------|------|---------|
| `id` | String (CUID) | Khóa chính |
| `userId` | String | FK → User |
| `productId` | String | FK → Product |
| `stripeSessionId` | String? | ID Stripe Checkout Session |
| `total` | Float | Tổng tiền |
| `quantity` | Int | Số lượng |
| `status` | String (default: `"pending"`) | `"pending"` / `"paid"` |

### Quan hệ giữa các models

```
User ──1:1──> Subscription
User ──1:N──> Post
User ──1:N──> Comment
User ──1:N──> Like
User ──1:N──> Order
User ──1:N──> ShippingAddress
Post ──1:N──> Comment
Post ──1:N──> Like
Product ──1:N──> Order
```

---

## 🌐 API Routes

### Authentication

| Method | Route | Mô tả |
|--------|-------|-------|
| `POST` | `/api/auth/register` | Đăng ký tài khoản mới |
| `POST` | `/api/auth/login` | Đăng nhập, trả về JWT cookie |
| `POST` | `/api/auth/logout` | Đăng xuất, xóa cookie |
| `GET` | `/api/auth/me` | Lấy thông tin user hiện tại từ session |

### Media

| Method | Route | Mô tả |
|--------|-------|-------|
| `POST` | `/api/sign-image` | Tạo Cloudinary upload signature (cho client-side upload) |

---

## 🚀 Hướng dẫn sử dụng

### Người dùng thông thường

1. **Đăng ký / Đăng nhập**
   - Vào `/signup` để tạo tài khoản mới, hoặc `/login` nếu đã có tài khoản

2. **Khám phá nội dung**
   - Trang chủ hiển thị feed bài viết
   - Bài viết Premium (không public) yêu cầu đăng ký gói thành viên

3. **Đăng ký gói thành viên**
   - Vào trang `/subscription` hoặc nhấn "Xem gói" trên AuthScreen
   - Chọn gói: Cơ bản (9tr/th), Cao cấp (19tr/th), Vĩnh viễn (49tr/th)
   - Chọn hình thức thanh toán: Theo tháng hoặc Theo năm
   - Thanh toán qua Stripe Checkout

4. **Mua hàng (Merch Store)**
   - Vào `/merch` để xem danh sách sản phẩm
   - Nhấn "Mua ngay" để thanh toán

5. **Quản lý tài khoản**
   - Vào `/update-profile` để cập nhật ảnh đại diện, tên hiển thị
   - Vào Stripe Billing Portal để quản lý subscription (hủy, nâng cấp)

### Admin

1. **Dashboard**: Vào `/dashboard` để truy cập
2. **Tab Analytics**: Xem tổng doanh thu, số subscriber, danh sách giao dịch gần đây
3. **Tab Content**: Đăng bài viết mới (caption + ảnh/video), chọn public/premium
4. **Tab Store**: Thêm sản phẩm mới, ẩn/hiện sản phẩm

### Biến môi trường chi tiết

| Biến | Bắt buộc | Mô tả |
|------|----------|-------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret key cho JWT token |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key (sk_test_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key (pk_test_...) |
| `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID` | ✅ | Stripe Price ID cho gói tháng |
| `NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID` | ✅ | Stripe Price ID cho gói năm |
| `RESEND_API_KEY` | ⚠️ (prod) | Resend API key cho email production |
| `RESEND_TEST_EMAIL` | ⚠️ | Email test khi dùng Resend |
| `GMAIL_USER` | ⚠️ (dev) | Gmail address cho email development |
| `GMAIL_APP_PASSWORD` | ⚠️ (dev) | Gmail App Password cho email development |

---

## 🧪 Kiểm thử

Hiện tại dự án chưa có bộ test tự động. Bạn có thể kiểm tra thủ công bằng cách:

1. Chạy dev server và kiểm tra luồng đăng ký → đăng nhập
2. Tạo Stripe test mode, dùng thẻ test (`4242 4242 4242 4242`) để kiểm tra thanh toán
3. Kiểm tra dashboard admin với user có `role: "admin"`

Để kiểm tra chất lượng code:

```bash
# Linting
npm run lint

# Format check với Biome
npm run biome:check

# Format code
npm run biome:format
```

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng làm theo các bước sau:

1. **Fork** repository
2. Tạo nhánh mới (`git checkout -b feature/amazing-feature`)
3. **Commit** thay đổi (`git commit -m 'feat: add amazing feature'`)
4. **Push** lên nhánh (`git push origin feature/amazing-feature`)
5. Tạo **Pull Request**

### Coding conventions

- Dự án sử dụng [Biome](https://biomejs.dev/) cho linting & formatting
- Tuân thủ cấu trúc Next.js App Router: server components mặc định, chỉ thêm `"use client"` khi cần
- Sử dụng Server Actions cho mutations, API routes cho auth endpoints
- Validation với Zod ở tất cả các input từ client
- Ưu tiên `const`, tránh `any`, dùng type guard với `filter`
- snake_case cho field names trong Prisma schema

---

## 📄 Giấy phép

Dự án được phân phối dưới giấy phép **MIT**. Xem file `LICENSE` để biết thêm chi tiết.

---

## 👥 Tác giả & Cảm ơn

- **Phát triển bởi** — **Trần Anh Tuấn**
- **Cảm ơn** cộng đồng mã nguồn mở:
  - [Next.js](https://nextjs.org/)
  - [Prisma](https://www.prisma.io/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Stripe](https://stripe.com/)
  - [Cloudinary](https://cloudinary.com/)
  - [Resend](https://resend.com/)
  - [React Email](https://react.email/)
  - [TanStack Query](https://tanstack.com/query/)

---

<p align="center">
  <strong>🐴 OnlyHorse — Đam mê cưỡi ngựa, kết nối cộng đồng</strong>
  <br>
  <sub>Built with ❤️ by Trần Anh Tuấn</sub>
</p>
