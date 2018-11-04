import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/app.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('myCanvas1') myCanvas1: ElementRef;
  @ViewChild('myCanvas2') myCanvas2: ElementRef;

  public context: CanvasRenderingContext2D;
  chart1:any;
  chart2:any;

  data = [];
  movieNames = [];
  movieLikes = [];
  movieViews = [];
  movieRatings = [];
  selectedCategory = 'All';

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {
  }

  selectCategory(cat: string){
    this.selectedCategory = cat;
    if (cat === 'All') {
      this.movieNames = this.data.map((m) => m.name);
      this.movieLikes = this.data.map((m) => m.likes);
      this.movieViews = this.data.map((m) => m.views);
      this.movieRatings = this.data.map((m) => m.ratings);
    } else if (cat === 'Movies') {
      this.movieNames = [];
      this.movieLikes = [];
      this.movieViews = [];
      this.movieRatings = [];
      this.data.forEach((m) => {
        if (m.category === 'Movie') {
          this.movieNames.push(m.name);
          this.movieLikes.push(m.likes);
          this.movieViews.push(m.views);
          this.movieRatings.push(m.ratings);
         }
     });
    } else if (cat === 'TV Series') {
      this.movieNames = [];
      this.movieLikes = [];
      this.movieViews = [];
      this.movieRatings = [];
      this.data.forEach((m) => {
        if (m.category === 'TV Series') {
          this.movieNames.push(m.name);
          this.movieLikes.push(m.likes);
          this.movieViews.push(m.views);
          this.movieRatings.push(m.ratings);
         }
     });
    };
    this.chart1.data = {
      labels: this.movieNames,
      datasets: [{
        label: 'Likes',
        data: this.movieLikes,
        borderColor: '#f45f42',
        fill: '#f45f42',
        backgroundColor: '#f45f42'
      },
      {
        label: 'Views',
        data: this.movieViews,
        borderColor: '#7fd0ff',
        fill: '#7fd0ff',
        backgroundColor: '#7fd0ff'
      },
      {
        label: 'Ratings',
        data: this.movieRatings,
        borderColor: '#3ec94e',
        fill: '#3ec94e',
        backgroundColor: '#3ec94e'
      }
    ]};

    let colorsArr = [];
    this.movieNames.forEach(() => colorsArr.push(this.getRandomColor()));
    this.chart2.data = {
      datasets: [{
        data: this.movieRatings,
        label: 'Ratings',
        backgroundColor: colorsArr,
      }],
      labels: this.movieNames,
    };
    this.chart1.update();
    this.chart2.update();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderBarGraph(
    // names: Array<string>,
    // likes: Array<number>,
    // views: Array<number>,
    // ratings: Array<number>
  ) {
    this.chart1 = new Chart(this.myCanvas1.nativeElement.getContext('2d'), {
      type: 'horizontalBar',
      data: {
        labels: this.movieNames,
        datasets: [{
          label: 'Likes',
          data: this.movieLikes,
          borderColor: '#f45f42',
          fill: '#f45f42',
          backgroundColor: '#f45f42'
        },
        {
          label: 'Views',
          data: this.movieViews,
          borderColor: '#7fd0ff',
          fill: '#7fd0ff',
          backgroundColor: '#7fd0ff'
        },
        {
          label: 'Ratings',
          data: this.movieRatings,
          borderColor: '#3ec94e',
          fill: '#3ec94e',
          backgroundColor: '#3ec94e'
        }
      ]
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Movies: Views and Likes'
        }
      }
    });
  }

  renderPolarArea() {
    // backgroundColors array for the polar area chart
    let colorsArr = [];
    for (let n = 0; n < this.movieNames.length; n++) {
      colorsArr.push(this.getRandomColor().toLowerCase());
    }

    this.chart2 = Chart.PolarArea(this.myCanvas2.nativeElement.getContext('2d'), {
      // type: 'doughnut',
      data: {
        datasets: [{
          data: this.movieRatings,
          label: 'Ratings',
          backgroundColor: colorsArr,
        }],
        labels: this.movieNames,
      },
      options: {
				responsive: true,
				legend: {
					position: 'right',
				},
				title: {
					display: true,
					text: 'Movie Ratings Comparison'
				},
				scale: {
					ticks: {
						beginAtZero: true
					},
					reverse: false
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}
    });
  }


  ngAfterViewInit() {
    this._dataService.getData()
      .subscribe((data) => this.data = data);
    this.movieNames = this.data.map((movie) => movie.name);
    this.movieViews = this.data.map((movie) => movie.views);
    this.movieLikes = this.data.map((movie) => movie.likes);
    this.movieRatings = this.data.map((movie) => movie.ratings);
    this.renderBarGraph();
    this.renderPolarArea();
  }
}
