import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CheckOutModule } from './check-out/check-out.module';
import { AdminGuard } from './core/guards/admin.guard';
import { MainModule } from './main/main.module';

const routes: Routes = [
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => AdminModule },
  { path: '', loadChildren: () => MainModule },
  { path: '', loadChildren: () => AuthModule },
  { path: '', loadChildren: () => CheckOutModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
