import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  api = 'http://api.openweathermap.org/data/2.5';
  api2 = 'https://maps.googleapis.com/maps/api';
  constructor(private httpclient: HttpClient) { }

  //get weather data service by city_name
  getWeather(city_name): Observable<any> {
    return this.httpclient.get(this.api + '/weather?q='+city_name+'&appid=a6d0e9f2c971f917d4feb6ddeef93bca');
  }

  //get location service
  getLocation(lat : any, long : any): Observable<any> {
    return this.httpclient.get(this.api2 + '/geocode/json?latlng='+lat+','+long+'&key=AIzaSyA5QAsWj3vt63BSQQsoNdQAokBUIUl3qCM');
  }
}
