import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from '../../../services/admin-auth.service';
import {Admin} from '../../../interfaces/admin';

@Component({
  selector: 'app-admin-login-screen',
  templateUrl: './admin-login-screen.component.html',
  styleUrls: ['./admin-login-screen.component.css']
})
export class AdminLoginScreenComponent implements OnInit {
  id: number;
  admin: Admin;
  isSubmitted  =  false;

  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit(): void {
    this.clearData();
  }

  signIn(){
    this.isSubmitted = true;
    this.id = 1;
    this.adminAuthService.signIn(this.admin, this.id);
  }

  clearData(): void{
    this.admin = {
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      password: ''
    };
  }

}
