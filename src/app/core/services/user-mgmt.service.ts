import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMgmtResult } from '../models/userMgmt';
@Injectable({
  providedIn: 'root'
})
export class UserMgmtService {

  constructor(private http: HttpClient) {
    
   }
   getUserList(): Observable<UserMgmtResult[]> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung';
    const params = {
      maNhom: 'GP02',
    };
    return this.http.get<UserMgmtResult[]>(url, { params });
  }
}
