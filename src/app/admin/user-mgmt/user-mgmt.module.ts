import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { UserMgmtRoutingModule } from './user-mgmt-routing.module';
import { UserMgmtComponent } from './user-mgmt.component';


@NgModule({
  declarations: [UserMgmtComponent],
  imports: [
    CommonModule,
    UserMgmtRoutingModule,
    DataTablesModule
  ]
})
export class UserMgmtModule { }
