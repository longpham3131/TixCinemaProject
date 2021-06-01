import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';



@NgModule({
  declarations: [SideBarComponent, TopBarComponent],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
  ]
})
export class AdminLayoutModule { }
