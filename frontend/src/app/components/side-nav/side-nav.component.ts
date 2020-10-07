import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {AdminAuthService} from '../../services/admin-auth.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );
  constructor(private breakpointObserver: BreakpointObserver,
              private adminAuthService: AdminAuthService,
              private authService: AuthService,
              private router: Router) {}

  signOutUser(){
    this.authService.logout();
    this.router.navigateByUrl(`/`);
  }


  ngOnInit(): void {
  }

}
