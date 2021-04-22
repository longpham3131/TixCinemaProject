import { DanhSachGhe } from '@/core/models/checkOut';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seat-item',
  templateUrl: './seat-item.component.html',
  styleUrls: ['./seat-item.component.scss'],
})
export class SeatItemComponent implements OnInit {
  @Input() seat: DanhSachGhe;

  @Output() onSelect = new EventEmitter();
  isSelected: boolean = false;
  totalPrice: number = 0;
  constructor() {
    this.seat = <DanhSachGhe>{};
  }

  handleSelect() {
    this.isSelected = !this.isSelected;
    this.onSelect.emit({ ...this.seat, isSelected: this.isSelected });
  }

  ngOnInit(): void {}
}
