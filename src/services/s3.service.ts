import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.bucket = process.env.STORAGE_BUCKET || "";
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: process.env.STORAGE_ENDPOINT,
      credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY as string,
        secretAccessKey: process.env.STORAGE_SECRET_KEY as string,
      },
    });
  }

  public generateUploadUrl = async (taskId: number, fileName: string) => {
    const folder = `task-${taskId}`;
    const url = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({ Bucket: this.bucket, Key: `${folder}/${fileName}` }),
      { expiresIn: 3600 }
    );
    return url;
  };
}
