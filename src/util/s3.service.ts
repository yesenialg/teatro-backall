import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET
  });

  uploadFile(file: Express.Multer.File) {
    const { originalname } = file;
    return this.s3_upload(file.buffer, originalname, file.mimetype);
  }

  async s3_upload(file, name, mimetype): Promise<any> {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1'
      }
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      console.log(s3Response);
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}