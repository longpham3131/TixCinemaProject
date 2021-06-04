import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MovieService } from '@/core/services/movie.service';
@Component({
  selector: 'app-add-edit-show-times',
  templateUrl: './add-edit-show-times.component.html',
  styleUrls: ['./add-edit-show-times.component.scss'],
})
export class AddEditShowTimesComponent implements OnInit {
  @Input() movieId: number = -1;
  showTimeForm: any;
  cinemaSystems: any;
  cinemaClusters: any;
  cinemas: any;
  error: string;
  private notifier: NotifierService;

  constructor(
    private movieService: MovieService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.showTimeForm = new FormGroup({
      ngayChieuGioChieu: new FormControl('', [Validators.required]),
      maRap: new FormControl('', [Validators.required]),
      giaVe: new FormControl('', [Validators.required]),
    });
    this.cinemaSystems = null;
    this.cinemaClusters = null;
    this.cinemas = null;
    this.error = '';
  }

  ngOnInit(): void {
    this.movieService.getParentCinemas().subscribe({
      next: (result) => {
        this.cinemaSystems = result;
      },
    });

    this.changeFormatDate('2021-06-17T03:15');
  }
  onChangeCinemaSystem(e: any) {
    this.movieService.getCinemaCluster(e.value).subscribe({
      next: (result) => {
        this.cinemaClusters = result;
        console.log('data', this.cinemaClusters);
      },
    });
  }
  onChangeCinemaCluster(e: any) {
    this.cinemas = this.cinemaClusters.find(
      (cluster: any) => cluster.maCumRap === e.value
    ).danhSachRap;
  }
  changeFormatDate(value: string) {
    const time = value.slice(11);
    //cắt chuỗi 2021-06-17 => 17-06-2021
    const dateTime =
      value.slice(8, 10) +
      '/' +
      value.slice(5, 7) +
      '/' +
      value.slice(0, 4) +
      ' ' +
      time +
      ':00';
    console.log('result', dateTime);
    return dateTime;
  }
  checkError(field: string, type?: string) {
    const control = this.showTimeForm.get(field);

    if (type) {
      return control?.errors?.[type];
    }

    return control?.invalid && (control?.touched || control?.dirty);
  }
  handleSubmit() {
    this.showTimeForm.markAllAsTouched();
    if (this.showTimeForm.invalid) return;

    console.log('data', {
      ...this.showTimeForm.value,
      maPhim: this.movieId,
      ngayChieuGioChieu: this.changeFormatDate(
        this.showTimeForm.value.ngayChieuGioChieu
      ),
    });
    this.movieService
      .addShowTime({
        ...this.showTimeForm.value,
        maPhim: this.movieId,
        ngayChieuGioChieu: this.changeFormatDate(
          this.showTimeForm.value.ngayChieuGioChieu
        ),
      })
      .subscribe({
        next: () => {
          this.notifier.notify('success', 'Thêm lịch chiếu thành công');
          ($('#ShowTimeMovie') as any).modal('hide');
        },
        error: (error) => {
          this.error = error.error;
          this.notifier.notify('error', this.error);
          console.log('ERROR', this.error);
        },
      });
  }
}
