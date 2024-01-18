import { Component, OnInit } from '@angular/core';
import { MovieService } from "../../services/movies.service";
import { NgForOf, NgIf } from "@angular/common";
import { finalize } from "rxjs";

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent implements OnInit {
  public movies: any[] = [];
  public isLoading: boolean = true;

  constructor(private moviesService: MovieService) {}

  public ngOnInit() {
    this.moviesService.getMovies().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((movies: any[]) => this.movies = movies);
  }
}
