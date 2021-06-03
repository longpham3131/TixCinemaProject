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
  dataMovie: any;
  updateMovieForm: FormGroup;
  private notifier: NotifierService;
  @Output() updateTable: EventEmitter<any> = new EventEmitter<any>();
  error: string = '';
  fileImage: any;
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
      hinhAnh: new FormControl('', [Validators.required]),
      moTa: new FormControl(this.dataMovie ? this.dataMovie.moTa : '', [
        Validators.required,
      ]),
    });
  }
  setDataMovie(user: any) {
    this.dataMovie = user;
    this.fileImage = user?.hinhAnh;
    console.log('data', this.dataMovie);
    this.updateMovieForm = new FormGroup({
      maPhim: new FormControl(
        {
          value: this.dataMovie ? this.dataMovie.maPhim : '',
          disabled: this.dataMovie ? true : false,
        },
        [Validators.required]
      ),
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
      hinhAnh: new FormControl('', [Validators.required]),
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
    // this.updateMovieForm.markAllAsTouched();
    // if (this.updateMovieForm.invalid) return;
    console.log(this.updateMovieForm.value);

    const formData = new FormData();
    Object.keys(this.updateMovieForm.controls).forEach((key) => {
      if (key === 'hinhAnh') {
        formData.append(key, this.fileImage);
      } else {
        formData.append(key, this.updateMovieForm.get(key)?.value);
      }
    });
    console.log('Data', formData.get('hinhAnh'));
    if (this.dataMovie) {
      console.log('THIS EDIT');
      this.movieService.updateMovie(formData).subscribe({
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
      console.log('THIS ADD', formData.get('hinhAnh'));
      this.movieService.addMovie(formData).subscribe({
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
  onHandleChange(e: any) {
    this.fileImage = e.target.files[0];
  }
}
