import { ThongTinLichChieuResult } from '@/core/models/checkOut';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.scss'],
})
export class SeatListComponent implements OnInit {
  @Input() checkOut: ThongTinLichChieuResult;
  @Output() onSelect = new EventEmitter();
  constructor() {
    this.checkOut = <ThongTinLichChieuResult>{};
  }

  handleSelect(seat: any): void {
    this.onSelect.emit(seat);
  }
  ngOnInit(): void {}
}
