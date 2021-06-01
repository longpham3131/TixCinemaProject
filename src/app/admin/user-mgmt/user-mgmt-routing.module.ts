import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMgmtComponent } from './user-mgmt.component';

const routes: Routes = [{path:'', component:UserMgmtComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMgmtRoutingModule { }
