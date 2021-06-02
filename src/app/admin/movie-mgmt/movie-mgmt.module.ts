import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MovieMgmtRoutingModule } from './movie-mgmt-routing.module';
import { DialogComponent } from '@/shared/components/dialog/dialog.component';
import { MovieMgmtComponent } from './movie-mgmt.component';
import { ComponentsModule } from '@/shared/components/components.module';

@NgModule({
  declarations: [MovieMgmtComponent],
  imports: [
    CommonModule,
    MovieMgmtRoutingModule,
    DataTablesModule,
    ComponentsModule,
  ],
})
export class MovieMgmtModule {}
