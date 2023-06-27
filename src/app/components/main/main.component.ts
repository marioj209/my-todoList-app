import { Component,OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {

  listItems: TaskModel[]=[];
  codeFilter: string='';
  title: string = '';
  
  
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {

    this.itemService.codeFilter$.subscribe(code => {
      this.codeFilter = code;
      this.changeTitle(code);
    })

    this.itemService.item$.subscribe(data => this.listItems = data);
    this.itemService.get();
  }

  changeTitle(code: string) {
    const TODO = "A", COMPLETADO = "C", PENDIENTE = "P";

    if (code === TODO) this.title = "TODO";
    else if (code === COMPLETADO) this.title = "COMPLETADO";
    else this.title = "PENDIENTE";
    
  }

}
