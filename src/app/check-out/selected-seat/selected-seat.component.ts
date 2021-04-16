import { CheckOutResult } from '@/core/models/checkOut';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-seat',
  templateUrl: './selected-seat.component.html',
  styleUrls: ['./selected-seat.component.scss'],
})
export class SelectedSeatComponent implements OnInit {
  @Input() checkOut: CheckOutResult;
  @Input() selectedSeats: any;

  constructor() {
    this.checkOut = <CheckOutResult>{};
    this.selectedSeats = [];
  }

  ngOnInit(): void {}
}
