import { DanhSachGhe, ThongTinLichChieuResult } from '@/core/models/checkOut';
import { AuthService } from '@/core/services/auth.service';
import { CheckOutService } from '@/core/services/check-out.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private checkOutService: CheckOutService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.loadingCompleted = false;
  }

  checkOut = <ThongTinLichChieuResult>{};
  currentUser: any = null;
  totalPrice: number = 0;
  loadingCompleted: Boolean;
  ngOnInit(): void {
    this.spinner.show();
    this.ActivatedRoute.params.subscribe({
      next: (params) => {
        this.checkOutService.getSeatList(params.checkOutId).subscribe({
          next: (result) => {
            this.checkOut = result;
            this.loadingCompleted = true;
            this.spinner.hide();
          },
          error: (error) => {
            console.log(error);
            this.loadingCompleted = true;
            this.spinner.hide();
          },
        });
      },
    });

    this.authService.currentUser.subscribe({
      next: (data) => {
        this.currentUser = data;
      },
    });
  }

  selectedSeats: DanhSachGhe[] = [];
  handleSelect(seat: any): void {
    if (seat.isSelected) {
      this.selectedSeats.push(seat);
      this.totalPrice += seat.giaVe;
    } else {
      this.totalPrice -= seat.giaVe;
      this.selectedSeats = this.selectedSeats.filter(
        (item) => item.maGhe !== seat.maGhe
      );
    }
  }
}
