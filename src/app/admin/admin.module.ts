import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { ComponentsModule } from '@/shared/components/components.module';
import { DialogComponent } from '@/shared/components/dialog/dialog.component';
import { AddEditShowTimesComponent } from './add-edit-show-times/add-edit-show-times.component';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [CommonModule, AdminRoutingModule, ComponentsModule],
  exports: [DialogComponent],
})
export class AdminModule {}
