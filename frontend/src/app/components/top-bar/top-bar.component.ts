import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from '../../services/admin-auth.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  userName = '';

  constructor(private authService: AuthService,
              private adminService: AdminService,
              private adminAuthService: AdminAuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.getName();
  }

  getName(){
    if (this.adminAuthService.isLoggedIn()){
      this.adminService.getAdmin().subscribe(r => {
        this.userName = r.admin.firstName + ' ' + r.admin.lastName;
        console.log(r);
        console.log(this.userName);
      });
    }
  }

  editUser(){
    if (this.adminAuthService.isLoggedIn()) {
      this.router.navigateByUrl(`/edit-admin`);
    }
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
