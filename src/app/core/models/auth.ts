export interface SignupParams {
  taiKhoan: string;
  matKhau: string;
  email: string;
  hoTen: string;
  soDt: string;
}

export interface SigninParams {
  taiKhoan: string;
  matKhau: string;
}

export type SignupResult = {
  maNhom: string;
  maLoaiNguoiDung: string;
} & SignupParams;

export interface SigninResult {
  taiKhoan: string;
  matKhau: string;
  email: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken: string;
}
