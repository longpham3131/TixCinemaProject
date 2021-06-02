import { UserService } from '@/core/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserList } from 'src/app/core/models/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.scss'],
})
export class UserMgmtComponent implements OnInit {
  @ViewChild(AddEditUserComponent) addEditUserCom!: AddEditUserComponent;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataUserEdit: any | null;
  userList: UserList[] = [];
  modalAddEditUser: any | null = {
    id: 'AddEditUser',
    header: '',
  };
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
    };

    this.userService.getUserList().subscribe({
      next: (result) => {
        this.userList = result;
        // Calling the DT trigger to manually render the table
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

  showModalUser(user: any) {
    if (user) {
      this.modalAddEditUser = {
        id: 'AddEditUser',
        header: 'Chỉnh sửa thông tin',
      };
      this.dataUserEdit = user;
      this.addEditUserCom.setDataUser(user);
      console.log('Edit', this.dataUserEdit);
    } else {
      this.modalAddEditUser = {
        id: 'AddEditUser',
        header: 'Thêm người dùng',
      };
      this.addEditUserCom.setDataUser(null);
      console.log('Thêm');
    }

    ($('#AddEditUser') as any).modal('show');
  }
}
