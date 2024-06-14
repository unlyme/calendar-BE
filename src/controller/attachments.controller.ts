import { Response, Request } from "express";
import { S3Service } from "../services/s3.service";

export class AttachmentsController {
  private s3Service: S3Service;

  constructor() {
    this.s3Service = new S3Service();
  }

  public generateUploadUrl = async (req: Request, res: Response) => {
    try {
      const { taskId, fileName } = req.body;
      const url = await this.s3Service.generateUploadUrl(
        Number(taskId),
        fileName
      );
      return res.status(200).json({ url });
    } catch (error) {}
  };
}
