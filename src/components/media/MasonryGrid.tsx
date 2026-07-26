import ZoomedImage from "@/components/media/ZoomedImage";

const images = Array.from({ length: 15 }, (_, i) => ({
  alt: `Horse image ${i + 1}`,
  id: `featured-${i + 1}`,
  src: `/featured/featured${i + 1}.jpg`,
}));

export default function MasonryGrid() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-20">
      <h2 className="mb-10 text-center font-bold text-3xl md:text-4xl">
        Bộ Sưu Tập Nổi Bật
      </h2>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>div:not(:first-child)]:mt-4">
        {images.map((img) => (
          <ZoomedImage
            alt={img.alt}
            className="mb-4 break-inside-avoid"
            key={img.id}
            src={img.src}
          />
        ))}
      </div>
    </section>
  );
}
