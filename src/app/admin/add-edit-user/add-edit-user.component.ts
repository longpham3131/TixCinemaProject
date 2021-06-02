import { UserList } from '@/core/models/user';
import { UserService } from '@/core/services/user.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Event } from 'jquery';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  @Input() btnSubmitName: string = '';
  dataUser: any = null;
  updateUserForm: FormGroup;
  private notifier: NotifierService;
  @Output() updateTable: EventEmitter<any> = new EventEmitter<any>();
  error: string = '';
  constructor(
    private userService: UserService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.updateUserForm = new FormGroup({
      taiKhoan: new FormControl(this.dataUser ? this.dataUser.taiKhoan : '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      matKhau: new FormControl(this.dataUser ? this.dataUser.matKhau : '', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      email: new FormControl(this.dataUser ? this.dataUser.email : '', [
        Validators.required,
        Validators.email,
      ]),
      hoTen: new FormControl(this.dataUser ? this.dataUser.hoTen : '', [
        Validators.required,
      ]),
      soDt: new FormControl(this.dataUser ? this.dataUser.soDt : '', [
        Validators.required,
        Validators.pattern('(09|03|07|08|05)+([0-9]{8})'),
      ]),
      maLoaiNguoiDung: new FormControl(
        this.dataUser ? this.dataUser.maLoaiNguoiDung : '',
        [Validators.required]
      ),
    });
  }
  setDataUser(user: any) {
    this.dataUser = user;
    console.log('data', this.dataUser);
    this.updateUserForm = new FormGroup({
      taiKhoan: new FormControl(this.dataUser ? this.dataUser.taiKhoan : '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      matKhau: new FormControl(this.dataUser ? this.dataUser.matKhau : '', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      email: new FormControl(this.dataUser ? this.dataUser.email : '', [
        Validators.required,
        Validators.email,
      ]),
      hoTen: new FormControl(this.dataUser ? this.dataUser.hoTen : '', [
        Validators.required,
      ]),
      soDt: new FormControl(this.dataUser ? this.dataUser.soDt : '', [
        Validators.required,
        Validators.pattern('(09|03|07|08|05)+([0-9]{8})'),
      ]),
      maLoaiNguoiDung: new FormControl(
        this.dataUser ? this.dataUser.maLoaiNguoiDung : '',
        [Validators.required]
      ),
    });
  }
  ngOnInit(): void {}

  checkError(field: string, type?: string) {
    const control = this.updateUserForm.get(field);

    if (type) {
      return control?.errors?.[type];
    }

    return control?.invalid && (control?.touched || control?.dirty);
  }

  handleSubmit() {
    // Xử lý chặn khi submit nhưng input có lỗi
    this.updateUserForm.markAllAsTouched();
    if (this.updateUserForm.invalid) return;
    console.log(this.updateUserForm.value);
    if (this.dataUser) {
      console.log('THIS EDIT');
      this.userService.updateUser(this.updateUserForm.value).subscribe({
        next: () => {
          this.notifier.notify('success', 'Cập nhật thông tin thành công!');
          this.updateTable.emit(this.updateUserForm.value);
          ($('#AddEditUser') as any).modal('hide');
        },
        error: (error) => {
          this.error = error.error;
          this.notifier.notify('error', this.error);
        },
      });
    } else {
      console.log('THIS ADD');
      this.userService.addUser(this.updateUserForm.value).subscribe({
        next: () => {
          this.notifier.notify('success', 'Thêm người dùng thành công!');
          this.updateTable.emit(this.updateUserForm.value);
          ($('#AddEditUser') as any).modal('hide');
        },
        error: (error) => {
          this.error = error.error;
          this.notifier.notify('error', this.error);
        },
      });
    }
  }
}
