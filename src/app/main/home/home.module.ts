import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MoviesShowingComponent } from './movies-showing/movies-showing.component';
import { NewsComponent } from './news/news.component';

// import {ComponentsModule} from 'src/app/shared/components/components.module'

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToolBoxComponent } from './tool-box/tool-box.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ComplexCinemaComponent } from './complex-cinema/complex-cinema.component';
import { MobileAppComponent } from './mobile-app/mobile-app.component';
import { ComponentsModule } from '@/shared/components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    MoviesShowingComponent,
    NewsComponent,
    ToolBoxComponent,
    MovieListComponent,
    ComplexCinemaComponent,
    MobileAppComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    SlickCarouselModule,
    ComponentsModule,
  ],
})
export class HomeModule {}
