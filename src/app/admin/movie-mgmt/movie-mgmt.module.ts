import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MovieMgmtRoutingModule } from './movie-mgmt-routing.module';
import { MovieMgmtComponent } from './movie-mgmt.component';


@NgModule({
  declarations: [MovieMgmtComponent],
  imports: [
    CommonModule,
    MovieMgmtRoutingModule,
    DataTablesModule
  ]
})
export class MovieMgmtModule { }
