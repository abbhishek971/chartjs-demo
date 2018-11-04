import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/app.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:Array<any> = [];
  mostRated:Array<any> = [];
  mostWatched:Array<any> = [];
  mostLiked:Array<any> = [];

  // identifiers for pagination
  maxSize = 5;
  pageSize = 12;
  totalItems = 0;
  currentPage = 1;

  displayType:string;
  modalRef: BsModalRef;
  selectedMovie:any = {
    name: '',
    likes: null,
    views: null,
    ratings: null,
    synopsis: null,
  };

  constructor(
    private _dataService: DataService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.displayType = 'grid';
    this._dataService.getData()
    .subscribe((data) => {
      this.data = data;
      this.totalItems = data.length;
    });
    this.filterTrendingData();
  }

  filterTrendingData() {
    let trendingMovies = _.sortBy(this.data, ['views']);
    trendingMovies = _.reverse(trendingMovies);
    for (let index = 0; index < 5; index++) {
      this.mostWatched.push(trendingMovies[index]);
    }

    let likedMovies = _.sortBy(this.data, ['likes']);
    likedMovies = _.reverse(likedMovies);
    for (let index = 0; index < 5; index++) {
      this.mostLiked.push(likedMovies[index]);
    }

    let highestRated = _.sortBy(this.data, ['ratings']);
    likedMovies = _.reverse(highestRated);
    for (let index = 0; index < 5; index++) {
      this.mostRated.push(highestRated[index]);
    }
  }

  openModal(template: TemplateRef<any>, movie: any) {
    this.selectedMovie = movie;
    this.modalRef = this.modalService.show(template);
  }
}
