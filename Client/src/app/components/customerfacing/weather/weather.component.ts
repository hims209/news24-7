import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

  //array for the weather data
  weather: any = [];

  constructor(private weatherservice: WeatherService) { }

  ngOnInit(): void {

    //if it does not allow location it will console that location is not supported
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    // to get the longitude and latitude
    navigator.geolocation.getCurrentPosition((position) => {

      //to get the location using longitude and latitude we got above 
      this.weatherservice.getLocation(position.coords.latitude, position.coords.longitude).subscribe((res) => {

        this.weatherservice.getWeather(res.results[0].address_components[2].long_name).subscribe((res) => {
          this.weather = res;
        })
      })
    });
  }




}
