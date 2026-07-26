"use client";

import { CldVideoPlayer } from "next-cloudinary";

export default function TodayHighlight() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-center font-bold text-3xl md:text-4xl">
          Điểm Nhấn Hôm Nay
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Video cưỡi ngựa chất lượng cao được chọn lọc mỗi ngày
        </p>
        <div className="aspect-video overflow-hidden rounded-2xl">
          <CldVideoPlayer
            autoplay={false}
            controls
            loop={false}
            muted={false}
            playsinline
            src="highlighted-vid_sntq2d"
          />
        </div>
      </div>
    </section>
  );
}
