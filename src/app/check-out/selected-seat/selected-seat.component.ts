import { DanhSachGhe, ThongTinLichChieuResult } from '@/core/models/checkOut';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CheckOutService } from '@/core/services/check-out.service';
import { Router } from '@angular/router';

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

  constructor(
    private checkOutService: CheckOutService,
    private router: Router
  ) {
    this.checkOut = <ThongTinLichChieuResult>{};
    this.totalPrice = 0;
  }
  handleCheckOut() {
    let checkOutResult: any = {
      maLichChieu: this.checkOut.thongTinPhim.maLichChieu,
      danhSachVe: this.selectedSeats,
      taiKhoanNguoiDung: this.currentUser.taiKhoan,
    };
    this.checkOutService.postCheckOut(checkOutResult).subscribe({
      next: () => {
        console.log('SUCCESS');
      },
      error: (error) => {
        console.log('error', error.error.text);
        window.confirm(error.error.text + ' Quay về trang chủ');
        this.router.navigateByUrl('/');
      },
      complete: () => {
        console.log('COMPLETE');
      },
    });
    console.log(checkOutResult);
  }

  ngOnInit(): void {}
}
