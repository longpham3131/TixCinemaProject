import { AuthService } from '@/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  currentUser: any = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //theo dõi biến currentUSer trong authService
    this.authService.currentUser.subscribe({
      next: (data) => {
        this.currentUser = data;
      },
    });
  }
  handleLogut() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.authService.setCurrentUser(null);
  }
  toMoviesShowing() {
    document
      .getElementById('moviesShowing')
      ?.scrollIntoView({ behavior: 'smooth' });

    console.log('AAAAA');
  }
}
