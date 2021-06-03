export interface MovieResult {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
}
export type MovieShowTimes = {
  heThongRapChieu: HeThongRapChieu[];
} & MovieResult;
// export interface MovieShowTimes {
//     heThongRapChieu: HeThongRapChieu[];
//     maPhim:          number;
//     tenPhim:         string;
//     biDanh:          string;
//     trailer:         string;
//     hinhAnh:         string;
//     moTa:            string;
//     maNhom:          string;
//     ngayKhoiChieu:   Date;
//     danhGia:         number;
// }

export interface HeThongRapChieu {
  cumRapChieu: CumRapChieu[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

export interface CumRapChieu {
  lichChieuPhim: LichChieuPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: null;
}

export interface LichChieuPhim {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
  thoiLuong: number;
}

export interface ThongTinHeThongRap {
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  biDanh: string;
}

export interface HeThongRap {
  lstCumRap: LstCumRap[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
}
export interface LstCumRap {
  danhSachPhim: DanhSachPhim[];
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
}

export interface DanhSachPhim {
  lstLichChieuTheoPhim: LstLichChieuTheoPhim[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
}

export interface LstLichChieuTheoPhim {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
}
