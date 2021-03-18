export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  writeFile(script: string, client_id: string): Promise<string>;
}