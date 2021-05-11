import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})

export class ImageSliderComponent implements OnInit {

  //Variables
  newsFeed: any = [];
  image: any = [];
  imgCollection: Array<object> = [];
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    //get All news on Image slider and display 3 recent news
    this.newsService.getAll().subscribe((res) => {
      console.log(res);
      this.newsFeed = res.newsData;
      this.imgCollection = [{
        image: this.newsFeed[0].imageUrl,
        thumbImage: this.newsFeed[0].imageUrl,
        alt: 'Image 1',
        title: this.newsFeed[0].title
      }, {
        image: this.newsFeed[1].imageUrl,
        thumbImage: this.newsFeed[1].imageUrl,
        alt: 'Image 2',
        title: this.newsFeed[1].title
      }, {
        image: this.newsFeed[2].imageUrl,
        thumbImage: this.newsFeed[2].imageUrl,
        alt: 'Image 3',
        title: this.newsFeed[2].title
      }];
    })
  }
}

