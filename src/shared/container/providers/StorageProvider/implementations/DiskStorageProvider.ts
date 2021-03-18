import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import uploadConfig from '@config/upload';

import IStorageProvider from "../models/IStorageProvider";

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async writeFile(script: string, client_id: string): Promise<string> {
    const fileHash = crypto.randomBytes(16).toString('hex');
    const fileName = `pixel${fileHash.substr(6, 8)}-${fileHash.substr(0, 6)}.js`;

    try {
      await fs.promises.writeFile(`${uploadConfig.uploadsFolder}/${fileName}`, script);
    } catch {
      return '';
    }

    return fileName;
  }
}

export default DiskStorageProvider;