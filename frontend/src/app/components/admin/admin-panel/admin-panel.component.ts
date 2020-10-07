import { Component, OnInit } from '@angular/core';
import {Admin} from '../../../interfaces/admin';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AdminAuthService} from '../../../services/admin-auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  admin: Admin;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location,
              private adminAuthService: AdminAuthService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin(){
    // todo - dobre, odkomentowac potem, a to nizej usunac
    // const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    // this.admin = this.adminAuthService.admin;
    // this.adminService.getAdmin().subscribe(r => this.admin = r);
    this.admin = {
      id: '1',
      firstName: 'Jurek',
      lastName: 'Ogórek',
      address: 'unknown',
      phoneNumber: '123123123',
      email: 'mail@mail.com',
      password: 'supertajnehaslo'
    };
  }

}
