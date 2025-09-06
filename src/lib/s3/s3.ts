import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const BUCKET = process.env.AWS_BUCKET_NAME as string;

interface UploadParams {
  key: string;
  body: Buffer | Uint8Array | Blob | string | ReadableStream;
  contentType?: string;
}


export async function uploadToS3({ key, body, contentType }: UploadParams): Promise<PutObjectCommandOutput> {
  const command: PutObjectCommandInput = {
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  return s3.send(new PutObjectCommand(command));
}

export async function getSignedUrlFromS3(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn });
}

export async function deleteFromS3(key: string): Promise<DeleteObjectCommandOutput> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return s3.send(command);
}
