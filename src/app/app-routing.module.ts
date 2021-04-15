import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CheckOutModule } from './check-out/check-out.module';
import { MainModule } from './main/main.module';

const routes: Routes = [
  { path: '', loadChildren: () => MainModule },
  { path: '', loadChildren: () => AuthModule },
  { path: '', loadChildren: () => CheckOutModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
