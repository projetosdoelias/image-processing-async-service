import { s3 } from "../config/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(file: Express.Multer.File) {
  const key = `${Date.now()}-${file.originalname}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return key;
}
