import { sqs } from "../config/aws";
import { SendMessageCommand } from "@aws-sdk/client-sqs";

export async function sendMessageToQueue(key: string) {
  const message = {
    fileKey: key,
    uploadedAt: new Date().toISOString(),
  };

  const result = await sqs.send(
    new SendMessageCommand({
      QueueUrl: process.env.SQS_URL!,
      MessageBody: JSON.stringify(message),
    })
  );

  return result.MessageId;
}
