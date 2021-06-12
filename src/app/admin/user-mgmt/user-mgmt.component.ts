import { UserService } from '@/core/services/user.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { UserList } from 'src/app/core/models/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.scss'],
})
export class UserMgmtComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(AddEditUserComponent) addEditUserCom!: AddEditUserComponent;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataUserEdit: any | null;
  userList: UserList[] = [];
  private notifier: NotifierService;
  btnSubmitModal: string = '';
  modalAddEditUser: any | null = {
    id: 'AddEditUser',
    header: '',
  };
  modalDeleteUser: any | null = {
    id: 'DeleteUser',
    header: 'Xóa tài khoản người dùng',
  };
  constructor(
    private userService: UserService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.userService.getUserList().subscribe({
      next: (result) => {
        this.userList = result;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2,
        };
        this.dtTrigger.next();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  updateTableList(value: any) {
    const index = this.userList.findIndex(
      (user) => user.taiKhoan === value.taiKhoan
    );

    if (index != -1) {
      this.userList[index] = { ...value };
    } else {
      this.userList.push(value);
    }

    this.reloadTable();
  }

  reloadTable() {
    //reload
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  showModalUser(user: any) {
    if (user) {
      this.modalAddEditUser = {
        id: 'AddEditUser',
        header: 'Chỉnh sửa thông tin',
      };
      this.dataUserEdit = user;
      this.addEditUserCom.setDataUser(user);
      this.btnSubmitModal = 'Cập nhật';
      console.log('Edit', this.dataUserEdit);
    } else {
      this.modalAddEditUser = {
        id: 'AddEditUser',
        header: 'Thêm người dùng',
      };
      this.addEditUserCom.setDataUser(null);
      this.btnSubmitModal = 'Thêm mới';
      console.log('Thêm');
    }
    ($('#AddEditUser') as any).modal('show');
  }

  onDeleteUser(username: any) {
    this.userService.deleteUser(username).subscribe({
      next: () => {
        const index = this.userList.findIndex(
          (user) => user.taiKhoan === username
        );
        this.userList.splice(index, 1);

        this.notifier.notify('success', 'Xóa thành công');

        this.reloadTable();

        ($('#DeleteUser') as any).modal('hide');
      },
      error: (error) => {
        // this.error = error.error;
        if (typeof error.error === 'object' && error.error !== null) {
          const index = this.userList.findIndex(
            (user) => user.taiKhoan === username
          );
          this.userList.splice(index, 1);

          this.notifier.notify('success', 'Xóa thành công');

          this.reloadTable();

          ($('#DeleteUser') as any).modal('hide');
        } else {
          this.notifier.notify('error', error.error);
          console.log('error', error.error);
        }
      },
    });
  }
}
