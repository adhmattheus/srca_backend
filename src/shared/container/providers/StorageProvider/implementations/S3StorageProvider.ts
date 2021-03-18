import fs from 'fs';
import path from 'path'
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import crypto from 'crypto';
import uploadConfig from '@config/upload';
import createConfig from '@config/create';

import IStorageProvider from "../models/IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    // const ContentType = mime.getType(originalPath);

    // if (!ContentType) {
    //   throw new Error('File not found');
    // }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
    }).promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    //const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    }).promise();
  }

  public async writeFile(script: string, client_id: string): Promise<string> {
    const fileHash = crypto.randomBytes(16).toString('hex');
    const fileName = `pixel${fileHash.substr(6, 8)}-${fileHash.substr(0, 6)}.js`;

    //(`${uploadConfig.tmpFolder}/${fileName}`, script);
    // const fileContent = fs.promises.createReadStream(script);
    await fs.promises.writeFile(`${uploadConfig.uploadsFolder}/${fileName}`, script);

    const originalPath = path.resolve(uploadConfig.uploadsFolder, fileName);

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: fileName,
      ACL: 'public-read',
      Body: fileContent,
    }).promise();

    await fs.promises.unlink(originalPath);

    return fileName;

  }
}

export default S3StorageProvider;