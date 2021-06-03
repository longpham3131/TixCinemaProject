import {
  LstCumRap,
  LstLichChieuTheoPhim,
  ThongTinHeThongRap,
} from './../../core/models/movie';
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
  @Input() movieId: number = 0;
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
      maPhim: new FormControl('', [Validators.required]),
      ngayChieuGioChieu: new FormControl('', [Validators.required]),
      maRap: new FormControl('', [Validators.required]),
      giaVe: new FormControl('', [Validators.required]),
    });
    this.cinemaSystems = null;
    this.cinemaClusters = null;
    this.cinemas = null;
    this.error = '';
  }

  ngOnInit(): void {}
  onChangeCinemaSystem() {}
  onChangeCinemaCluster() {}

  handleSubmit() {}
}
