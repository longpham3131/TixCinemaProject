import { CheckOutResult } from '@/core/models/checkOut';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.scss'],
})
export class SeatListComponent implements OnInit {
  @Input() checkOut: CheckOutResult;
  @Output() onSelect = new EventEmitter();
  constructor() {
    this.checkOut = <CheckOutResult>{};
  }

  handleSelect(seat: any): void {
    this.onSelect.emit(seat);
  }
  ngOnInit(): void {}
}
