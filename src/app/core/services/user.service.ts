import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUser, UserList, UserParam } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserList(): Observable<UserList[]> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung';
    const params = {
      maNhom: 'GP02',
    };
    return this.http.get<UserList[]>(url, { params });
  }
  getUserDetail(username: UserParam): Observable<UpdateUser> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan';
    return this.http.post<UpdateUser>(url, username);
  }

  updateUser(values: UpdateUser): Observable<any> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';

    return this.http.put(url, {
      ...values,
      maNhom: 'GP02',
      maLoaiNguoiDung: 'KhachHang',
    });
  }
}
