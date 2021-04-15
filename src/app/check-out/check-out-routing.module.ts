import { CheckOutGuard } from '@/core/guards/check-out.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out.component';

const routes: Routes = [
  {
    path: 'checkOut/:checkOutId',
    canActivate: [CheckOutGuard],
    component: CheckOutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckOutRoutingModule {}
