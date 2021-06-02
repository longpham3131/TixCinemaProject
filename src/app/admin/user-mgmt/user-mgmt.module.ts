import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { UserMgmtRoutingModule } from './user-mgmt-routing.module';
import { UserMgmtComponent } from './user-mgmt.component';
import { ComponentsModule } from '@/shared/components/components.module';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [UserMgmtComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    UserMgmtRoutingModule,
    DataTablesModule,
    ComponentsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class UserMgmtModule {}
