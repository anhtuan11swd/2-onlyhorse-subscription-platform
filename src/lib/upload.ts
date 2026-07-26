import { cloudinary } from "@/lib/cloudinary";

export async function uploadToCloudinary(
  file: File,
  folder = "/2-onlyhorse-subscription-platform/posts",
): Promise<{ secureUrl: string; publicId: string; resourceType: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Tải lên thất bại"));
          return;
        }
        resolve({
          publicId: result.public_id,
          resourceType: result.resource_type,
          secureUrl: result.secure_url,
        });
      },
    );
    uploadStream.end(buffer);
  });
}
