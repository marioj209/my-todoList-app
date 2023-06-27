import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  id?: number;
  itemSub: TaskModel[] = [];
  private sub = new Subject<TaskModel[]>();
  item$ = this.sub.asObservable();

  private subFilter = new Subject<string>();
  codeFilter$ = this.subFilter.asObservable();

  constructor() { }

  private generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);

  }

  add(newItem: TaskModel) {
    this.get();
    newItem.id = this.generateId();
    this.itemSub.push(newItem);
    this.sub.next(this.itemSub);
    localStorage.setItem("item", JSON.stringify(this.itemSub))
  }
get() {
  let storedItems = localStorage.getItem("item");
  let listItems: TaskModel[] = [];

  if (storedItems !== null) {
    listItems = JSON.parse(storedItems);
  }

  if (listItems == null) {
    this.itemSub = [];
    this.sub.next([]);
  } else {
    this.itemSub = listItems;
    this.sub.next(listItems);
  }
}
  
  filter(code: string) {
    this.subFilter.next(code);
  }

    changeState(id: string, state: boolean) {
      let itemResult = this.itemSub.map(item => {
        if (item.id === id) item.state = state;
        return item;
      });
      
      this.sub.next(itemResult);
      localStorage.setItem("item", JSON.stringify(itemResult));
      this.itemSub = itemResult;

  }

  delete(itemId:string) {
    let itemResult = this.itemSub.filter(items => items.id != itemId);
    this.sub.next(itemResult);
    localStorage.setItem("item", JSON.stringify(itemResult));
    this.itemSub = itemResult;

  }

}
