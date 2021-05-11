import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Story } from 'src/app/models/story';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
})

export class SportsComponent implements OnInit, AfterViewInit {
  constructor(
    private newsService: NewsService,
    private modalService: NgbModal
  ) {
    this.dataSource = new MatTableDataSource(this.news);
  }

  displayedColumns: string[] = ['title', 'description', 'publishDate','images'];

  dataSource: MatTableDataSource<Story>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  actionIndex: number;
  newStory: any = {};
  search: String = '';
  entryNumber: number = 10;

  news: Story[] = [];


  // open(modal) {
  //   this.modalService.open(modal);
  // }

  //Convert string to proper date formate
  convertStringToDate(date: string): Date {
    var datef = new Date(date);
    var final = new Date(datef.getTime() + 1000 * 60 * 60 * 24);
    return final;
  }

  //on init it will use getallsports news api and get the news related to sports
  ngOnInit(): void {
    this.newsService.getAllSports().subscribe((res) => {
      this.news = res.newsData;
      this.dataSource = new MatTableDataSource(this.news);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
