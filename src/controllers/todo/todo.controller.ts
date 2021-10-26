import { Request, Response, Application, Router } from "express";
import { injectable } from 'inversify';

import { IoC, TYPES } from "../../composition/app.composition";
import { RouteError } from "../../models/route-error";
import { ITodoService } from "../../services/todo.service";

@injectable()
export class TodoController {

  private router: Router;
  private todoService: ITodoService;

  constructor(private app: Application) {
    this.configure();
    this.todoService = IoC.get<ITodoService>(TYPES.TodoService);
  }

  private configure = () => {
    this.router = Router();
    this.router
      .get('/', this.getTodoItems)
      .post('/', this.addTodoItems)

    this.app.use('/api/todo', this.router);
  }

  getTodoItems = (_req: Request, res: Response, next: any) => {
    return this.todoService.getAllTodoItems()
      .then(items => res.json(items))
      .catch((ex: Error) => next(new RouteError(ex.message, 500)));
  }

  addTodoItems = (req: Request, res: Response, next: any) => {
    if (!req.body.description) return next(new RouteError("Description not provided", 400));
    return this.todoService.addTodoItem(req.body.description)
      .then(items => res.json(items))
      .catch((ex: Error) => next(new RouteError(ex.message, 500)));
  }

}