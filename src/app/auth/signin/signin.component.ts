import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  error: string = '';
  constructor(private authService: AuthService, private router: Router) {
    this.signinForm = new FormGroup({
      taiKhoan: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(6),
      ]),
      matKhau: new FormControl('', [Validators.required]),
    });
  }
  checkError(field: string, type?: string) {
    const control = this.signinForm.get(field);

    if (type) {
      return control?.errors?.[type];
    }

    return control?.invalid && (control?.touched || control?.dirty);
  }

  ngOnInit(): void {}

  handleSignin() {
    //Xử lý chặn khi submit nhưng input có lỗi
    this.signinForm.markAllAsTouched();
    if (this.signinForm.invalid) return;

    this.authService.signin(this.signinForm.value).subscribe({
      next: (result) => {
        //set kết quả đăng nhập cho biến currentUser
        this.authService.setCurrentUser(result);
        // Lưu data  xuống localStorage
        localStorage.setItem('user', JSON.stringify(result));

        // Quay lại trang chủ
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        // gán thông báo từ BE chuyển lên vào thuộc tính error
        this.error = error.error;
      },
    });
  }
}
