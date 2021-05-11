import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../models/story';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  //base url for the news service
  api: string = 'http://localhost:9000/api/v1/news';

  constructor(private httpService: HttpClient) {}
  //get all news service
  getAll(): Observable<any> {
    return this.httpService.get(this.api+'/');
  }
  //get all news with the sports tag
  getAllSports(): Observable<any> {
    return this.httpService.get(this.api+'/sports');
  }
  //add the news service
  add(story: Story): Observable<any> {
    return this.httpService.post(this.api, story);
  }
  //Edit news service
  edit(story: Story): Observable<any> {
    return this.httpService.patch(this.api + '/' + story._id, story);
  }
  //Delete news Service
  delete(id: number): Observable<any> {
    return this.httpService.delete(this.api + '/' + id);
  }
}
