import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  SigninParams,
  SigninResult,
  SignupParams,
  SignupResult,
} from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Tạo ra một đối tượng User để lưu data
  private currentUserSubject = new BehaviorSubject<SigninResult | null>(null);
  // Chuyển currentUser thành một Observable để subcribe  sự thay đổi data của biến này
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Khi service khởi chạy, kiểm tra trong localStorage nếu có user sẽ set lại biến cho currentUser
    const user = localStorage.getItem('user');
    if (user) {
      this.setCurrentUser(JSON.parse(user));
    }
  }

  getCurrentUser() {
    // Get value của biến currentUser
    return this.currentUserSubject.value;
  }

  setCurrentUser(value: any) {
    // set lại value của biến user
    this.currentUserSubject.next(value);
  }
  signin(values: SigninParams): Observable<SigninResult> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap';

    return this.http.post<SigninResult>(url, values);
  }

  signup(values: SignupParams): Observable<SignupResult> {
    const url = 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy';

    return this.http.post<SignupResult>(url, { ...values, maNhom: 'GP02' });
  }
}
