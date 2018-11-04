import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:Array<any> = [];
  displayType:string;

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.displayType = 'grid';
    this._dataService.getData()
    .subscribe((data) => {
      this.data = data;
      console.log(data);
    })
  }

}
