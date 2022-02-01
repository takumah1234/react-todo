import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { DBInterface } from './DBInterface';
import { db } from './firebase_config';
import { TodoItemInterface } from './todo';

export class DB implements DBInterface {
  private static instance: DB;

  private Data: TodoItemInterface[] = [];

  private Order: string[] = [];

  private loginUid: string = '';

  private constructor() {
    this.Data = [];
    this.Order = [];
    this.loginUid = '';
  }

  static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  async getAuthData(uid: string): Promise<String> {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.loginUid = docSnap.data().userId;
    }
    return this.loginUid;
  }

  async getData(): Promise<TodoItemInterface[]> {
    await getDocs(collection(db, 'todos')).then((snapShot) => {
      snapShot.forEach((item) => {
        this.Data.push({
          id: item.id,
          context: item.data().context,
        });
      });
    });
    const docRef = doc(db, 'Order', 'Order');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.Order = docSnap.data().order;
    }

    this.Data.sort((a: TodoItemInterface, b: TodoItemInterface) => {
      const aIndex: number = this.Order.indexOf(a.id);
      const bIndex: number = this.Order.indexOf(b.id);
      return aIndex - bIndex;
    });

    return this.Data;
  }

  async saveData(context: string): Promise<TodoItemInterface[]> {
    const docRef = await addDoc(collection(db, 'todos'), {
      context,
    });
    const item: TodoItemInterface = {
      id: docRef.id,
      context,
    };
    this.Data.push(item);
    this.updateOrder(this.Data);
    return this.Data;
  }

  updateOrder(dataList: TodoItemInterface[]): TodoItemInterface[] {
    this.Data = dataList;
    this.Order = this.Data.map((item: TodoItemInterface) => item.id);
    const docRef = doc(db, 'Order', 'Order');
    updateDoc(docRef, {
      order: this.Order,
    });
    return this.Data;
  }

  removeData(target: TodoItemInterface): TodoItemInterface[] {
    deleteDoc(doc(db, 'todos', target.id));
    this.Data = this.Data.filter((item: TodoItemInterface) => item !== target);
    this.updateOrder(this.Data);
    return this.Data;
  }
}

export default DB;
