import { AuthService } from '@/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  currentUser: any = null;
  constructor(private authService: AuthService,  private router: Router) {}

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
    this.router.navigateByUrl('/signin');
  }

}
