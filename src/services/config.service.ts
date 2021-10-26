import * as fs from 'fs';

export class ConfigService<T> {

  getConfig(path: string): Promise<T> {
    return new Promise((res, err) => {
      fs.readFile(path, 'utf-8', (ex, data) => {
        if (ex) return err(new Error(ex.message));
        res(JSON.parse(data));
      })
    });
  }

}