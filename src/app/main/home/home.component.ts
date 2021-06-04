import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loadingCompleted: Boolean;
  constructor(private spinner: NgxSpinnerService) {
    this.loadingCompleted = false;
  }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.loadingCompleted = true;
      this.spinner.hide();
    }, 1000);
  }
}
