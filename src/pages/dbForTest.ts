import { DBInterface } from './DBInterface';
import { TodoItemInterface } from './todo';

export class TestDB implements DBInterface {
  private static instance: TestDB;

  private Data: TodoItemInterface[];

  private Order: string[];

  private constructor() {
    this.Data = [
      {
        id: '0',
        context: '家計簿の書き込み',
      },
      {
        id: '1',
        context: '宿題',
      },
    ];
    this.Order = ['0', '1'];
  }

  static getInstance(): TestDB {
    if (!TestDB.instance) {
      TestDB.instance = new TestDB();
    }
    return TestDB.instance;
  }

  getData(): Promise<TodoItemInterface[]> {
    return new Promise((resolve) => {
      resolve(this.Data);
    });
  }

  saveData(context: string): Promise<TodoItemInterface[]> {
    return new Promise((resolve) => {
      this.Data.push({
        id: `${this.Data.length + 1}`,
        context,
      });

      resolve(this.Data);
    });
  }

  updateOrder(dataList: TodoItemInterface[]): TodoItemInterface[] {
    this.Data = dataList;
    this.Order = this.Data.map((item: TodoItemInterface) => item.id);
    return this.Data;
  }

  removeData(target: TodoItemInterface): TodoItemInterface[] {
    this.Data = this.Data.filter((item: TodoItemInterface) => item !== target);
    this.updateOrder(this.Data);
    return this.Data;
  }
}

export default TestDB;
