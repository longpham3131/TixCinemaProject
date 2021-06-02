import { MovieService } from '@/core/services/movie.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.scss'],
})
export class AddEditMovieComponent implements OnInit {
  @Input() btnSubmitName: string = '';
  dataMovie: any = null;
  updateMovieForm: FormGroup;
  private notifier: NotifierService;
  @Output() updateTable: EventEmitter<any> = new EventEmitter<any>();
  error: string = '';
  constructor(
    private movieService: MovieService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.updateMovieForm = new FormGroup({
      maPhim: new FormControl(this.dataMovie ? this.dataMovie.maPhim : '', [
        Validators.required,
      ]),
      ngayKhoiChieu: new FormControl(
        this.dataMovie ? this.dataMovie.ngayKhoiChieu : '',
        [Validators.required]
      ),
      tenPhim: new FormControl(this.dataMovie ? this.dataMovie.tenPhim : '', [
        Validators.required,
      ]),
      danhGia: new FormControl(this.dataMovie ? this.dataMovie.danhGia : '', [
        Validators.required,
      ]),
      trailer: new FormControl(this.dataMovie ? this.dataMovie.trailer : '', [
        Validators.required,
      ]),
      hinhAnh: new FormControl(this.dataMovie ? this.dataMovie.hinhAnh : '', [
        Validators.required,
      ]),
      moTa: new FormControl(this.dataMovie ? this.dataMovie.moTa : '', [
        Validators.required,
      ]),
    });
  }
  setDataMovie(user: any) {
    this.dataMovie = user;
    console.log('data', this.dataMovie);
    this.updateMovieForm = new FormGroup({
      maPhim: new FormControl(this.dataMovie ? this.dataMovie.maPhim : '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      ngayKhoiChieu: new FormControl(
        this.dataMovie ? this.dataMovie.ngayKhoiChieu : '',
        [Validators.required]
      ),
      tenPhim: new FormControl(this.dataMovie ? this.dataMovie.tenPhim : '', [
        Validators.required,
      ]),
      danhGia: new FormControl(this.dataMovie ? this.dataMovie.danhGia : '', [
        Validators.required,
      ]),
      trailer: new FormControl(this.dataMovie ? this.dataMovie.trailer : '', [
        Validators.required,
      ]),
      hinhAnh: new FormControl(this.dataMovie ? this.dataMovie.hinhAnh : '', [
        Validators.required,
      ]),
      moTa: new FormControl(this.dataMovie ? this.dataMovie.moTa : '', [
        Validators.required,
      ]),
    });
  }
  ngOnInit(): void {}

  checkError(field: string, type?: string) {
    const control = this.updateMovieForm.get(field);

    if (type) {
      return control?.errors?.[type];
    }

    return control?.invalid && (control?.touched || control?.dirty);
  }

  handleSubmit() {
    // Xử lý chặn khi submit nhưng input có lỗi
    this.updateMovieForm.markAllAsTouched();
    if (this.updateMovieForm.invalid) return;
    console.log(this.updateMovieForm.value);
    if (this.dataMovie) {
      console.log('THIS EDIT');
      this.movieService.updateMovie(this.updateMovieForm.value).subscribe({
        next: () => {
          this.notifier.notify(
            'success',
            'Cập nhật thông tin phim thành công!'
          );
          this.updateTable.emit(this.updateMovieForm.value);
          ($('#AddEditMovie') as any).modal('hide');
        },
        error: (error) => {
          this.error = error.error;
          this.notifier.notify('error', this.error);
        },
      });
    } else {
      console.log('THIS ADD');
      this.movieService.addMovie(this.updateMovieForm.value).subscribe({
        next: () => {
          this.notifier.notify('success', 'Thêm phim thành công!');
          this.updateTable.emit(this.updateMovieForm.value);
          ($('#AddEditMovie') as any).modal('hide');
        },
        error: (error) => {
          this.error = error.error;
          this.notifier.notify('error', this.error);
        },
      });
    }
  }
}
