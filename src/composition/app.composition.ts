import "reflect-metadata";
import * as _path from 'path';
import { Container } from "inversify";

import { AppConfig } from "../models/app.config";
import { ILogger, Logger } from "../logger";
import { IApiService, ApiService } from "../api.service";
import { SampleDataContext } from "../data/sample.context";
import { ITodoService, TodoService } from "../services/todo.service";

export const IoC = new Container();

export function Configure(config: AppConfig): Promise<Container> {
  return configureDatabase()
    .then(_ => configureServices(config));
}

function configureDatabase(): Promise<Container> {
  const dataPath = _path.join(__dirname, '../../app/data/db.json');
  let context = new SampleDataContext(dataPath);
  return context.initialize().then(_ => {
    IoC.bind<SampleDataContext>(TYPES.SampleDataContext).toConstantValue(context);
    return IoC;
  });
}

function configureServices(config: AppConfig): Promise<Container> {
  IoC.bind<AppConfig>(TYPES.AppConfig).toConstantValue(config);
  IoC.bind<ILogger>(TYPES.Logger).to(Logger);
  IoC.bind<IApiService>(TYPES.ApiService).to(ApiService);
  IoC.bind<ITodoService>(TYPES.TodoService).to(TodoService);
  return Promise.resolve(IoC);
}

const TYPES = {
  AppConfig: "AppConfig",
  Logger: "Logger",
  WarehouseControlDatabase: "WarehouseControlDatabase",
  ApiService: "ApiService",
  SampleDataContext: "SampleDataContext",
  TodoService: "TodoService"
};

export { TYPES };