/* istanbul ignore file */
import * as _path from 'path';

import { AppConfig } from './models/app.config';
import { ConfigService } from './services/config.service';

export const ConfigFactory = {
  GenerateConfig: () => {
    let configService = new ConfigService<AppConfig>();
    let path = _path.join(__dirname, '..', 'app', 'config', 'app.config.json');
    return configService.getConfig(path);
  }
}