import { CheckOutResult } from '@/core/models/checkOut';
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
    private checkOutService: CheckOutService
  ) {}

  checkOut = <CheckOutResult>{};

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
  }
}
