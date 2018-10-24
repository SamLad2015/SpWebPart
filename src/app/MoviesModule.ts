import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent }  from './MoviesComponent';
import { MoviesListSpService } from './MoviesListSpService';
import { HttpModule, Headers } from '@angular/http';
import { AuthService } from './AuthService';
import { MoviesService } from './MoviesService';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, HttpModule],
  declarations: [MoviesComponent],
  providers: [AuthService, MoviesListSpService, MoviesService],
  bootstrap: [MoviesComponent]
})
export class MoviesModule {
  ngDoBootStrap(){}
}
