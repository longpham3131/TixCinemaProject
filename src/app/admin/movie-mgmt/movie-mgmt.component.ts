import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MovieResult } from '@/core/models/movie';
import { MovieService } from '@/core/services/movie.service';
import { Subject } from 'rxjs';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-movie-mgmt',
  templateUrl: './movie-mgmt.component.html',
  styleUrls: ['./movie-mgmt.component.scss'],
})
export class MovieMgmtComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(AddEditMovieComponent) addEditMovieCom!: AddEditMovieComponent;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  movieList: MovieResult[] = [];
  dataMovieEdit: any | null;
  private notifier: NotifierService;
  btnSubmitModal: string = '';
  modalAddEditMovie: any | null = {
    id: 'AddEditMovies',
    header: '',
  };
  modalDeteleMovie: any | null = {
    id: 'DeleteMovie',
    header: 'Xóa phim',
  };
  constructor(
    private movieService: MovieService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.movieService.getMovieList().subscribe({
      next: (result) => {
        this.movieList = result;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2,
        };

        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  updateTableList(value: any) {
    const index = this.movieList.findIndex(
      (movie) => movie.maPhim === value.maPhim
    );

    if (index != -1) {
      this.movieList[index] = { ...value };
    } else {
      this.movieList.push(value);
    }

    this.reloadTable();
  }

  reloadTable() {
    //reload
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  showModalMovie(movie: any) {
    if (movie) {
      this.modalAddEditMovie = {
        id: 'AddEditMovies',
        header: 'Chỉnh sửa phim',
      };
      this.dataMovieEdit = movie;
      this.addEditMovieCom.setDataMovie(movie);
      this.btnSubmitModal = 'Cập nhật';
      console.log('movie', movie);
    } else {
      this.modalAddEditMovie = {
        id: 'AddEditMovies',
        header: 'Thêm phim',
      };
      this.addEditMovieCom.setDataMovie(null);
      this.btnSubmitModal = 'Thêm mới';
      console.log('Thêm');
    }

    ($('#AddEditMovies') as any).modal('show');
  }

  onDeleteMovie(movieId: any) {
    this.movieService.deleteMovie(movieId).subscribe({
      next: () => {
        const index = this.movieList.findIndex(
          (movie) => movie.maPhim === movieId
        );
        this.movieList.splice(index, 1);

        this.notifier.notify('success', 'Xóa thành công');

        this.reloadTable();

        ($('#DeleteMovie') as any).modal('hide');
      },
      error: (error) => {
        // this.error = error.error;
        this.notifier.notify('error', error.error);
        console.log('error', error.error);
      },
    });
  }
}
