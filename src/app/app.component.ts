import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private showLoadingIndicator = true;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd ) {
        this.showLoadingIndicator = false;
      }
    });
  }

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
