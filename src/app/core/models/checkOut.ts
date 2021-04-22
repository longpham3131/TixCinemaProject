export interface ThongTinLichChieuResult {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
}

export interface DanhSachGhe {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: string;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: null | string;
}

export interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}

export interface CheckOut {
  maLichChieu: number;
  danhSachVe: DanhSachVe[];
  taiKhoanNguoiDung: string;
}

export interface DanhSachVe {
  maGhe: number;
  giaVe: number;
}
