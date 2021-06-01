import { Component, OnInit } from '@angular/core';
import { MovieResult } from '@/core/models/movie';
import { MovieService } from '@/core/services/movie.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-movie-mgmt',
  templateUrl: './movie-mgmt.component.html',
  styleUrls: ['./movie-mgmt.component.scss']
})
export class MovieMgmtComponent implements OnInit {
  movieList: MovieResult[]= []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.movieService.getMovieList().subscribe({
      next: (result) =>{
        this.movieList = result
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
