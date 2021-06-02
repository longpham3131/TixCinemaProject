import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MovieMgmtRoutingModule } from './movie-mgmt-routing.module';
import { MovieMgmtComponent } from './movie-mgmt.component';
import { ComponentsModule } from '@/shared/components/components.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';

@NgModule({
  declarations: [MovieMgmtComponent, AddEditMovieComponent],
  imports: [
    CommonModule,
    MovieMgmtRoutingModule,
    DataTablesModule,
    ComponentsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class MovieMgmtModule {}
