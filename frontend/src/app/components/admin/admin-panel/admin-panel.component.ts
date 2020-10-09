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
  admin: any;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location,
              private adminAuthService: AdminAuthService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.admin = this.adminAuthService.admin;
    this.adminService.getAdmin().subscribe(r => {
      this.admin = r.admin;
      console.log(r);
    });
  }

}
