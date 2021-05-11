import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { AboutusComponent } from './components/customerfacing/aboutus/aboutus.component';
import { ContactusComponent } from './components/customerfacing/contactus/contactus.component';
import { CustomerhomeComponent } from './components/customerfacing/customerhome/customerhome.component';
import { WeatherComponent } from './components/customerfacing/weather/weather.component';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageNewsComponent } from './components/admin_facing/manage-news/manage-news.component';

import { ImageSliderComponent } from './components/customerfacing/image-slider/image-slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ChatboxComponent } from './components/customerfacing/chatbox/chatbox.component';

import { SportsComponent } from './components/customerfacing/sports/sports.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ChatService } from './services/chat.service';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MustMatchDirective,
    AboutusComponent,
    ContactusComponent,
    CustomerhomeComponent,
    WeatherComponent,
    ManageNewsComponent,
    SportsComponent,
    ImageSliderComponent,
    ChatboxComponent,
    NotFoundComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    MatNativeDateModule,

    NgImageSliderModule,
  ],
  providers: [
    WeatherService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    ChatService,
    DatePipe,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
