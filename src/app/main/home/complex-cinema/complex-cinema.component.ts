import {
  CumRapChieu,
  DanhSachPhim,
  HeThongRap,
  HeThongRapChieu,
  LstCumRap,
  LstLichChieuTheoPhim,
} from '@/core/models/movie';
import { MovieService } from '@/core/services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complex-cinema',
  templateUrl: './complex-cinema.component.html',
  styleUrls: ['./complex-cinema.component.scss'],
})
export class ComplexCinemaComponent implements OnInit {
  parentCinemaList: HeThongRapChieu[] = [];

  CinemaList: LstCumRap[] = [];

  MovieList: DanhSachPhim[] = [];

  MovieShowTimes: LstLichChieuTheoPhim[] = [];

  selectPCinema: string = '';

  selectCinema: string = '';

  constructor(private movieService: MovieService) {}

  // const resultFind = trees.filter(tree => tree.startsWith("m"));
  ngOnInit(): void {
    this.movieService.getParentCinemas().subscribe({
      next: (result) => {
        this.parentCinemaList = result;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.movieService.getShowTimesInCinemas('BHDStar').subscribe({
      next: (result) => {
        this.CinemaList = result[0].lstCumRap;
        this.renderMovieHasShowTimeToDay(this.CinemaList[0]);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  renderMovieHasShowTimeToDay(Cinema: LstCumRap) {
    let ArrayMovie: any[] = [];
    Cinema.danhSachPhim.forEach((movie) => {
      if (
        movie.lstLichChieuTheoPhim.findIndex((showTime) =>
          showTime.ngayChieuGioChieu.toString().startsWith('2019-01-01')
        ) != -1
      ) {
        ArrayMovie.push(movie);
      }
    });
    this.MovieList = ArrayMovie.slice();
  }

  renderShowTimeMovieToday(movie: DanhSachPhim) {
    return movie.lstLichChieuTheoPhim.filter((showTime) =>
      showTime.ngayChieuGioChieu.toString().startsWith('2019-01-01')
    );
  }

  // Khi click vào thì show Cụm rạp chiếu và showTime của cụm rạp thứ 1
  showCinema(PcinemaID: string) {
    this.movieService.getShowTimesInCinemas(PcinemaID).subscribe({
      next: (result) => {
        this.CinemaList = result[0].lstCumRap;
        this.renderMovieHasShowTimeToDay(this.CinemaList[0]);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.selectPCinema = PcinemaID;
    this.selectCinema = '';
  }

  ShowTimeMovie(CinemaID: string) {
    this.selectCinema = CinemaID;
    let index = this.CinemaList.findIndex(
      (cinema) => cinema.maCumRap === CinemaID
    );
    this.renderMovieHasShowTimeToDay(this.CinemaList[index]);
  }
}
