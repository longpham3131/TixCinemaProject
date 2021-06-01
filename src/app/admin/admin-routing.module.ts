import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashBoardModule } from './dash-board/dash-board.module';
import { MovieMgmtModule } from './movie-mgmt/movie-mgmt.module';
import { UserMgmtModule } from './user-mgmt/user-mgmt.module';

const routes: Routes = [{path: '',component: AdminLayoutComponent, children: [
  {path:'dash-board', loadChildren: () => DashBoardModule},
  {path:'user-management', loadChildren: () => UserMgmtModule},
  {path:'movie-management', loadChildren: () => MovieMgmtModule},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
