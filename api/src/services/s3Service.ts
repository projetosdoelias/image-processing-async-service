import { s3 } from "../config/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(file: Express.Multer.File) {
  const key = `${Date.now()}-${file.originalname}`;
  if (!process.env.S3_BUCKET) {
    throw new Error("Missing S3_BUCKET env");
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );
  const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;

  return { key, url };
}
