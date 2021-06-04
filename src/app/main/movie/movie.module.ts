import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { ShowTimesComponent } from './show-times/show-times.component';
import { MovieComponent } from './movie.component';
import { ComponentsModule } from '@/shared/components/components.module';

@NgModule({
  declarations: [MovieInfoComponent, ShowTimesComponent, MovieComponent],
  imports: [CommonModule, MovieRoutingModule, ComponentsModule],
})
export class MovieModule {}
