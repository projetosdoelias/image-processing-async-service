import { S3Client } from "@aws-sdk/client-s3";
import { SQSClient } from "@aws-sdk/client-sqs";

const region = process.env.AWS_REGION || "us-east-1";

export const s3 = new S3Client({
  region,
});

export const sqs = new SQSClient({
  region,
});
