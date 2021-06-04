import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [DialogComponent, LoadingComponent],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [DialogComponent, LoadingComponent],
})
export class ComponentsModule {}
