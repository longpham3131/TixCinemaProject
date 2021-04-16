import { CheckOutResult } from '@/core/models/checkOut';
import { AuthService } from '@/core/services/auth.service';
import { CheckOutService } from '@/core/services/check-out.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private checkOutService: CheckOutService,
    private authService: AuthService
  ) {}

  checkOut = <CheckOutResult>{};
  currentUser: any = null;
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe({
      next: (params) => {
        this.checkOutService.getSeatList(params.checkOutId).subscribe({
          next: (result) => {
            this.checkOut = result;
          },
          error: (error) => {
            console.log(error);
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

  selectedSeats: any[] = [];
  handleSelect(seat: any): void {
    if (seat.isSelected) {
      this.selectedSeats.push(seat);
    } else {
      // Xóa
      this.selectedSeats = this.selectedSeats.filter(
        (item) => item.id !== seat.id
      );
    }
  }
}
