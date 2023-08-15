export class AppStorage {
  private storage: Map<string, string> = new Map<string, string>();

  public get(key: string) {
    return this.storage.get(key);
  }

  public set(key: string, value: string) {
    this.storage.set(key, value);
  }
}
