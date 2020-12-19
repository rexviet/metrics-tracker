export interface IDatabaseConfig {
  readonly dbName: string;
  readonly host: string;
  readonly user?: string;
  readonly password?: string;
}
export class DatabaseConfig implements IDatabaseConfig {
  constructor(
    readonly dbName: string,
    readonly host: string,
    readonly user?: string,
    readonly password?: string,
  ) {}
}

export class MongoUtils {
  public static getMongoUri(config: IDatabaseConfig): string {
    let credential = '';
    if (config.user && config.password) {
      credential = `${config.user}:${config.password}@`;
    }

    return `mongodb://${credential}${config.host}/${config.dbName}`;
  }
}