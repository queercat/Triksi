export class AppStorage<T> {
  private storage: Map<string, T> = new Map<string, T>();

  public get(key: string) {
    return this.storage.get(key);
  }

  public set(key: string, value: T) {
    this.storage.set(key, value);
  }
}
