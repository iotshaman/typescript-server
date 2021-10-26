import { injectable } from "inversify";

import { IoC, TYPES } from "../composition/app.composition";
import { TodoItem } from "../data/models/todo-item";
import { SampleDataContext } from "../data/sample.context";

export interface ITodoService {
  getAllTodoItems: () => Promise<TodoItem[]>;
  addTodoItem: (description: string) => Promise<TodoItem>;
}

@injectable()
export class TodoService implements ITodoService {

  context: SampleDataContext;

  constructor() {
    this.context = IoC.get<SampleDataContext>(TYPES.SampleDataContext);
  }

  getAllTodoItems = (): Promise<TodoItem[]> => {
    return new Promise(res => {
      let items = this.context.models.todoItems.filter(i => !!i);
      res(items);
    });
  }

  addTodoItem = (description: string): Promise<TodoItem> => {
    let todoItem = new TodoItem(description);
    this.context.models.todoItems.add(todoItem.id, todoItem);
    return this.context.saveChanges().then(_ => (todoItem));
  }

}