import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Story } from 'src/app/models/story';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';

//Components
@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.css'],
})

//class
export class ManageNewsComponent implements OnInit, AfterViewInit {

  //Constructor
  constructor(
    private modalService: NgbModal,
    private newsService: NewsService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.news);
  }

  //Define datatype 
  displayedColumns: string[] = [
    'title',
    'description',
    'publishDate',
    'actions',
  ];
  news: Story[] = [];


  dataSource: MatTableDataSource<Story>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  actionIndex: number;
  newStory: any = {};
  search: String = '';
  entryNumber: number = 10;

  //It will open the form for adding new news story
  onAddStory(modal) {
    this.newStory = {};
    this.modalService.open(modal);
  }
  //It will perform the adding story functionality by subscribing the API
  addStory() {
    console.log("new story", this.newStory)
    this.newsService.add(this.newStory).subscribe((res) => {
      this.news = this.news.concat([res.data]);
      this.modalService.dismissAll();
      this.newStory = {};
      this.dataSource = new MatTableDataSource(this.news);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  //It will Open form to edit the news story
  onEdit(id: number, modal) {
    for (let i = 0; i < this.news.length; ++i) {
      if (this.news[i]._id == id) {
        this.actionIndex = i;
        break;
      }
    }
    this.newStory = {
      title: this.news[this.actionIndex].title,
      type: this.news[this.actionIndex].type,

      description: this.news[this.actionIndex].description,
      publishDate: this.news[this.actionIndex].publishDate,
      url: this.news[this.actionIndex].url,
      imageUrl: this.news[this.actionIndex].imageUrl,
    };

    this.modalService.open(modal);
  }
  //It will perform edit operation functionality by subscribing the API 
  edit() {
    this.newStory._id = this.news[this.actionIndex]._id;
    this.newsService.edit(this.newStory).subscribe((res) => {
      this.news[this.actionIndex] = this.newStory;

      this.modalService.dismissAll();
      this.newStory = {};

      this.dataSource = new MatTableDataSource(this.news);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  //It will open the delete confirmation box here!
  onDelete(id, modal) {
    for (let i = 0; i < this.news.length; ++i) {
      if (this.news[i]._id == id) {
        this.actionIndex = i;
        break;
      }
    }
    this.modalService.open(modal);
  }
  //It will perform the delete story functionality by subscribing the API
  delete() {
    this.newsService
      .delete(this.news[this.actionIndex]._id)
      .subscribe((res) => {
        this.news.splice(this.actionIndex, 1);
        this.modalService.dismissAll();

        this.dataSource = new MatTableDataSource(this.news);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    //logic to delete off backend
  }
  open(modal) {
    this.modalService.open(modal);
  }
  //method for converting string date to date datatype
  convertStringToDate(date: string): Date {
    var datef = new Date(date);
    var final = new Date(datef.getTime() + 1000 * 60 * 60 * 24);
    return final;
  }

  ngOnInit(): void { }
  //It will get all the news data from newsService.getAll() method
  ngAfterViewInit(): void {
    this.newsService.getAll().subscribe((res) => {
      this.news = res.newsData;
      this.dataSource = new MatTableDataSource(this.news);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  //Applying filters
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
