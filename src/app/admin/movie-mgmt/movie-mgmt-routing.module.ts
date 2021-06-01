import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieMgmtComponent } from './movie-mgmt.component';

const routes: Routes = [{path:'', component:MovieMgmtComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieMgmtRoutingModule { }
