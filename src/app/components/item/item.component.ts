import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskModel } from 'src/app/models/task.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: []
})
export class ItemComponent implements OnInit {
  @Input() index: number;
  @Input() item: TaskModel | undefined;
  chkItem: FormControl;

  constructor(private itemService: ItemService) {
    this.chkItem = new FormControl(this.item?.state); 
    this.index = 0; 
  }

  ngOnInit(): void {
    if (this.item) {
      this.chkItem.setValue(this.item.state);
    }
    this.chkItem.valueChanges.subscribe(chkState => {
      this.changeState(chkState);
    });
  }

  deleteItem(itemId: string | undefined) {
    if (itemId) {
      this.itemService.delete(itemId);
    }
  }

  changeState(chkState: boolean) {
    if (this.item && this.item.id) {
      this.itemService.changeState(this.item.id, chkState);
    }
  }
}
