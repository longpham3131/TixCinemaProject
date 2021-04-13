import {
  CumRapChieu,
  HeThongRapChieu,
  MovieShowTimes,
} from '@/core/models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  movieShowTimes: MovieShowTimes = <MovieShowTimes>{};

  cinema = <CumRapChieu>{};

  selectedPCinema: string = '';
  ngOnInit(): void {
    // activatedRoute: service của angular cung cấp các phương thức để làm việc với url
    this.ActivatedRoute.params.subscribe({
      next: (params) => {
        // Lấy dc mã phim => dùng mã phim gọi API
        this.movieService.getShowTimesMovie(params.movieId).subscribe({
          next: (result) => {
            this.movieShowTimes = result;
            this.selectedPCinema = this.movieShowTimes.heThongRapChieu[0].maHeThongRap.slice();
            this.renderShowTime();
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }

  renderShowTime(day = '2019-01-01') {
    let index = this.movieShowTimes.heThongRapChieu.findIndex(
      (Pcine) => Pcine.maHeThongRap === this.selectedPCinema
    );
    this.cinema = {
      ...this.movieShowTimes.heThongRapChieu[index].cumRapChieu[0],
    };
    this.cinema.lichChieuPhim = this.cinema.lichChieuPhim.filter((item) =>
      item.ngayChieuGioChieu.toString().startsWith(day)
    );
  }
  changeParentCinema(value: string) {
    this.selectedPCinema = value;
    this.renderShowTime();
  }
}
