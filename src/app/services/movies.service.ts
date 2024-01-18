import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, mergeAll, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from "../models/movie";
import { Character } from "../models/character";

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://swapi.dev/api/films/';

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((rawMovies: any) =>
        forkJoin<Movie[]>(
          rawMovies.results.map((movie: any) =>
            this.getMovieCharacters(movie.characters)
              .pipe(map((characters) => ({ ...movie, characters })))
          )
        )
      ),
      mergeAll()
    );
  }

  public getMovieCharacters(characterUrls: string[]): Observable<Character[]> {
    return forkJoin(characterUrls.map((url) => this.http.get<Character>(url)));
  }
}
