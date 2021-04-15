import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckOutResult } from '../models/checkOut';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  constructor(private http: HttpClient) {}

  getSeatList(checkOutId: string): Observable<CheckOutResult> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe';

    const params = {
      MaLichChieu: checkOutId,
    };
    return this.http.get<CheckOutResult>(url, { params });
  }
}
