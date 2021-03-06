export interface UserParam {
    taiKhoan: string;
}
export interface UpdateUser{
    taiKhoan:        string;
    matKhau:         string;
    email:           string;
    soDt:            string;
    maNhom:          string;
    maLoaiNguoiDung: string;
    hoTen:           string;
}
export interface UserList {
    taiKhoan:        string;
    hoTen:           string;
    email:           string;
    soDt:            null | string;
    matKhau:         null | string;
    maLoaiNguoiDung: string;
}
export interface UserDetail {
    taiKhoan:      string;
    matKhau:       string;
    hoTen:         string;
    email:         string;
    soDT:          string;
    maNhom:        string;
    loaiNguoiDung: null;
    thongTinDatVe: ThongTinDATVe[];
}

export interface ThongTinDATVe {
    danhSachGhe:   DanhSachGhe[];
    maVe:          number;
    ngayDat:       Date;
    tenPhim:       string;
    giaVe:         number;
    thoiLuongPhim: number;
}

export interface DanhSachGhe {
    maHeThongRap:  string;
    tenHeThongRap: string;
    maCumRap:      string;
    tenCumRap:     string;
    maRap:         number;
    tenRap:        string;
    maGhe:         number;
    tenGhe:        string;
}