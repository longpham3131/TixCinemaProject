import { MovieResult } from '@/core/models/movie';
import { MovieService } from '@/core/services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: MovieResult[]= []

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4, "rows" : 2};
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe({
      next: (result) =>{
        this.movieList = result
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }
}
