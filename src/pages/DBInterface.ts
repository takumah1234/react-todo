import { TodoItemInterface } from './todo';

export interface DBInterface {
  getData(): Promise<TodoItemInterface[]>;
  saveData(context: string): Promise<TodoItemInterface[]>;
  updateOrder(dataList: TodoItemInterface[]): TodoItemInterface[];
  removeData(target: TodoItemInterface): TodoItemInterface[];
}
