import { injectable } from 'inversify';
import { RepositoryContext, Repository } from 'json-repo';
import { TodoItem } from './models/todo-item';

@injectable()
export class SampleDataContext extends RepositoryContext {
  constructor(dataPath: string) { super(dataPath); }
  models = {
    todoItems: new Repository<TodoItem>()
  }
}