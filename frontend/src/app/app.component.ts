import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {AdminAuthService} from './services/admin-auth.service';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
              private adminAuthService: AdminAuthService,
              private authService: AuthService,
              private router: Router) {}

  signOutAdmin(){
    this.adminAuthService.logout();
    this.router.navigateByUrl(`/`);
  }

  signOutUser(){
    this.authService.logout();
    this.router.navigateByUrl(`/`);
  }

}
