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
              private router: Router) { }

  ngOnInit(): void {
  }

  signOutUser(){
    this.authService.logout();
    this.router.navigateByUrl(`/`);
  }
}
