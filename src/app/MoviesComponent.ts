import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Movie } from './Movie';
import { MoviesListSpService } from './MoviesListSpService';

@Component({
  selector: 'my-movies',
  template: '<form [formGroup]="movieForm" (ngSubmit)="addMovie()">' +
    ' <div style="height:30px;display:block">' +
    '  <label><span style="width:100px;display:inline-block">Name: </span><input required type="text" id="name" formControlName="name"></label>' +
    ' </div>' +
    ' <div style="height:30px;display: block">' +
    '   <label><span style="width:100px;display:inline-block">Year: </span><input required type="number" id="year" formControlName="year"></label>' +
    ' </div>' +
    ' <div style="height:30px;display: block">' +
    '  <button type="submit">Add a Movie</button>' +
    ' </div>' +
    '</form> ' +
    '<ul> ' +
    '   <li *ngFor="let movie of movies">' +
    '     {{movie.name}} - {{movie.year}} ' +
    '   </li>' +
    '</ul>',
  encapsulation: ViewEncapsulation.None
})

export class MoviesComponent implements OnInit {
  private movies: Movie[]=[];
  private movieForm: FormGroup;

  constructor(private fb: FormBuilder, private moviesListSpService:MoviesListSpService){
    this.moviesListSpService.setApiLinkPart("lists/getbytitle('movies')/items");
    this.moviesListSpService.getAll().subscribe((data: any[]) => {
      this.movies = data;
    });
  }
  public ngOnInit(): void {
    this.movieForm = this.fb.group({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      'year': new FormControl(2000, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  public addMovie(): void{
    const newMovie = new Movie(this.movieForm.controls['name'].value, this.movieForm.controls['year'].value);
    this.movies.push(newMovie);
  }

  public addMovies(movies: Movie[]): void{
    this.movies = movies;
  }
}
