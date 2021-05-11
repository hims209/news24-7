import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story';
import { NewsService } from 'src/app/services/news.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.css'],
})


export class CustomerhomeComponent implements OnInit {
  //Variables
  weather: any = [];
  newsFeed: any = [];

  //Date conversion in proper formate
  convertStringToDate(date: string): Date {
    var datef = new Date(date);
    var final = new Date(datef.getTime() + 1000 * 60 * 60 * 24);
    return final;
  }
  //Constructor defining services
  constructor(
    private weatherservice: WeatherService,
    private newsService: NewsService
  ) {}

  //on init it will subscribe the newsService method to get all News
  ngOnInit(): void {
    this.newsService.getAll().subscribe((res) => {
      console.log(res);
      this.newsFeed = res.newsData;
      console.log(this.newsFeed);
      console.log('homepage');
    });
  }
}
