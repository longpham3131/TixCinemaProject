import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CumRapChieu,
  HeThongRap,
  HeThongRapChieu,
  MovieResult,
  MovieShowTimes,
} from '../models/movie';
// ng g service [name]
// ng g s [name]

@Injectable({
  // Khai báo service tự động vào trong providers trong App.Module
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovieList(): Observable<MovieResult[]> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim';
    const params = {
      maNhom: 'GP02',
    };
    return this.http.get<MovieResult[]>(url, { params });
  }

  getShowTimesMovie(movieId: string): Observable<MovieShowTimes> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim';
    const params = {
      maPhim: movieId,
    };
    return this.http.get<MovieShowTimes>(url, { params });
  }

  getParentCinemas(): Observable<HeThongRapChieu[]> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap';
    return this.http.get<HeThongRapChieu[]>(url);
  }
  getCinemaCluster(cinemaSystemId: any): Observable<any> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong';
    const params = {
      maHeThongRap: cinemaSystemId,
    };
    return this.http.get<any>(url, { params });
  }
  getShowTimesInCinemas(PCinemaID: string): Observable<HeThongRap[]> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap';
    const params = {
      maHeThongRap: PCinemaID,
      maNhom: 'GP02',
    };
    return this.http.get<HeThongRap[]>(url, { params });
  }

  updateMovie(value: any): Observable<any> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload';

    return this.http.post<any>(url, { ...value, maNhom: 'GP02' });
  }
  addMovie(value: any): Observable<any> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh';
    return this.http.post<any>(url, { ...value, maNhom: 'GP02' });
  }
  deleteMovie(movieId: any): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${movieId}`;

    return this.http.delete(url);
  }
  addShowTime(value: any): Observable<any> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu';
    return this.http.post<any>(url, value);
  }
}
