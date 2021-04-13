import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-app',
  templateUrl: './mobile-app.component.html',
  styleUrls: ['./mobile-app.component.scss'],
})
export class MobileAppComponent implements OnInit {
  constructor() {}
  mobileSlideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  ngOnInit(): void {}
}
