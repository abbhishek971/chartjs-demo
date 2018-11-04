import { Component, OnInit } from '@angular/core';
import { DataService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Array<any> = [];
  displayType: string;

  constructor(
    private _dataService: DataService
  ) { }
  ngOnInit(){
    this.displayType = 'grid';
    this.getData();
  }

  getData() {
    this._dataService.getData()
    .subscribe(data => {
      this.data = data;
    });
  }
}
