import { DanhSachGhe, ThongTinLichChieuResult } from '@/core/models/checkOut';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CheckOutService } from '@/core/services/check-out.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-selected-seat',
  templateUrl: './selected-seat.component.html',
  styleUrls: ['./selected-seat.component.scss'],
})
export class SelectedSeatComponent implements OnInit {
  @Input() checkOut: ThongTinLichChieuResult;
  @Input() selectedSeats: DanhSachGhe[] = [];
  @Input() currentUser: any;
  @Input() totalPrice: number;
  countDown: Number = 5;
  private notifier: NotifierService;
  constructor(
    private checkOutService: CheckOutService,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.checkOut = <ThongTinLichChieuResult>{};
    this.totalPrice = 0;
    this.notifier = notifierService;
  }
  handleCheckOut() {
    let checkOutResult: any = {
      maLichChieu: this.checkOut.thongTinPhim.maLichChieu,
      danhSachVe: this.selectedSeats,
      taiKhoanNguoiDung: this.currentUser.taiKhoan,
    };
    this.checkOutService.postCheckOut(checkOutResult).subscribe({
      next: () => {
        ($('#ModalBill') as any).modal({ backdrop: 'static', keyboard: false });
        ($('#ModalBill') as any).modal('show');
        let time = 5000;
        let countdown = setInterval(() => {
          // console.log(object)
          this.countDown = time / 1000;
          time = time - 1000;
          if (time < 0) {
            clearInterval(countdown);
            console.log('TIME OUT');
          }
        }, 1000);
      },
      error: (error) => {
        if (typeof error.error === 'object' && error.error !== null) {
          ($('#ModalBill') as any).modal({
            backdrop: 'static',
            keyboard: false,
          });
          ($('#ModalBill') as any).modal('show');
          let time = 5000;
          let countdown = setInterval(() => {
            this.countDown = time / 1000;
            time = time - 1000;
            if (time < 0) {
              ($('#ModalBill') as any).modal('hide');
              clearInterval(countdown);
              this.router.navigateByUrl('/');
            }
          }, 1000);
        } else {
          this.notifier.notify('error', error.error);
          console.log('error', error.error);
        }
      },
      complete: () => {
        console.log('COMPLETE');
      },
    });
    console.log(checkOutResult);
  }

  backToHome() {
    ($('#ModalBill') as any).modal('hide');
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
