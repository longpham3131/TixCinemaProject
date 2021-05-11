import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserInfo, UserInfoParam, UserInfoResult } from '../models/userInfo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  username: string | undefined = '';
  constructor(private http: HttpClient, private authService : AuthService) {
    this.authService.currentUser.subscribe({
      next:(data) => {
        this.username = data?.taiKhoan;
      }
    })
   }

  getUserInfo(username: UserInfoParam): Observable<UserInfoResult>{
    const url ='https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan';
    return this.http.post<UserInfoResult>(url,username);
  }

  updateUserInfo(values: UpdateUserInfo): Observable<any>{
    const url ='https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
    
    return this.http.put(url, {...values, taiKhoan: this.username ,maNhom: 'GP02', maLoaiNguoiDung:'KhachHang'});
   
  }
}
