import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MovieModule } from './movie/movie.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'movie/:movieId', loadChildren: () => MovieModule },
      { path: '', loadChildren: () => HomeModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
