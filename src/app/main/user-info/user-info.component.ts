import { ThongTinDATVe, UserParam } from '@/core/models/user';
import { AuthService } from '@/core/services/auth.service';
import { UserService } from '@/core/services/user.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UserInfoComponent implements OnInit {
  //Test

  //End test
  private notifier: NotifierService;
  currentUser: any = null;
  ticketList: ThongTinDATVe[] = [];
  columnsToDisplay = ['maVe', 'tenPhim', 'ngayDat', 'thoiLuongPhim'];
  expandedElement: ThongTinDATVe[] | null = null;
  updateUserForm: FormGroup;
  error: string = '';
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.updateUserForm = new FormGroup({
      taiKhoan: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      matKhau: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      hoTen: new FormControl('', [Validators.required]),
      soDt: new FormControl('', [
        Validators.required,
        Validators.pattern('(09|03|07|08|05)+([0-9]{8})'),
      ]),
    });
    this.authService.currentUser.subscribe({
      next: (data: any) => {
        this.currentUser = data;
        this.userService.getUserDetail(data).subscribe({
          next: (data: any) => {
            this.ticketList = data.thongTinDatVe;
            console.log(this.ticketList);
            this.updateUserForm = new FormGroup({
              taiKhoan: new FormControl(
                { value: data.taiKhoan, disabled: true },
                [
                  Validators.required,
                  Validators.minLength(6),
                  Validators.maxLength(10),
                ]
              ),
              matKhau: new FormControl(data.matKhau, [
                Validators.required,
                Validators.pattern(
                  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
                ),
              ]),
              email: new FormControl(data.email, [
                Validators.required,
                Validators.email,
              ]),
              hoTen: new FormControl(data.hoTen, [Validators.required]),
              soDt: new FormControl(data.soDT, [
                Validators.required,
                Validators.pattern('(09|03|07|08|05)+([0-9]{8})'),
              ]),
            });
          },
          error: (error) => {
            console.log('error userInfo', error.error);
          },
        });
      },
      error: (error) => {
        console.log('Error user', error.error);
      },
    });
  }
  checkError(field: string, type?: string) {
    const control = this.updateUserForm.get(field);

    if (type) {
      return control?.errors?.[type];
    }

    return control?.invalid && (control?.touched || control?.dirty);
  }

  ngOnInit(): void {}

  handleSignup() {
    // Xử lý chặn khi submit nhưng input có lỗi
    this.updateUserForm.markAllAsTouched();
    if (this.updateUserForm.invalid) return;
    console.log(this.updateUserForm.value);
    this.userService
      .updateUser({
        ...this.updateUserForm.value,
        taiKhoan: this.currentUser.taiKhoan,
        maLoaiNguoiDung: 'KhachHang',
      })
      .subscribe({
        next: (result) => {
          this.notifier.notify('success', 'Cập nhật thông tin thành công!');
          const valueChange = {
            ...this.currentUser,
            email: result.email,
            hoTen: result.hoTen,
            soDT: result.soDT,
          };
          this.authService.setCurrentUser(valueChange);
          localStorage.setItem('user', JSON.stringify(valueChange));
        },
        error: (error) => {
          this.error = error.error;
          this.notifier.notify('error', this.error);
        },
      });
  }
}
