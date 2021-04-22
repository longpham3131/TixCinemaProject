import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckOut, ThongTinLichChieuResult } from '../models/checkOut';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  constructor(private http: HttpClient) {}

  getSeatList(checkOutId: string): Observable<ThongTinLichChieuResult> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe';

    const params = {
      MaLichChieu: checkOutId,
    };
    return this.http.get<ThongTinLichChieuResult>(url, { params });
  }
  postCheckOut(checkOut: CheckOut) {
    const url = 'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe';
    return this.http.post(url, checkOut);
  }
}
