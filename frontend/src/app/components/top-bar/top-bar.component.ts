import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from '../../services/admin-auth.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private authService: AuthService,
              private adminAuthService: AdminAuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  redirect(){
    if (this.adminAuthService.isLoggedIn()){
      this.router.navigateByUrl(`/admin-panel`);
    }
    else if (this.authService.isLoggedIn()){
      this.router.navigateByUrl(`/`);
    }
  }

  signOutUser(){
    if (this.adminAuthService.isLoggedIn()){
      this.adminAuthService.logout();
    }
    else if (this.authService.isLoggedIn()){
      this.authService.logout();
    }
  }
}
