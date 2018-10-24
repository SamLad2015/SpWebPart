import {Injectable} from '@angular/core';
import {Movie} from './Movie';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  
  public get():Movie[]{
    return this.movies;
  }
  
  public set(movies: Movie[]):void{
    this.movies = movies;
  }
}
