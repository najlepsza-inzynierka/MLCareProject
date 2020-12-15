import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AdminAuthService} from '../../../services/admin-auth.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  admin: any;
  institution: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'email', 'phoneNumber'];
  dataSource: MatTableDataSource<any>;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location,
              private adminAuthService: AdminAuthService) {
    this.dataSource = new MatTableDataSource(this.institution);
  }

  ngOnInit(): void {
    this.getAdmin();
    this.getMedicals();
  }

  getAdmin(){
    this.admin = this.adminAuthService.admin;
    this.adminService.getAdmin().subscribe(r => {
      this.admin = r.admin;
    });
  }

  getMedicals(){
    this.adminService.getAllMedicals().
    subscribe(medicals => {
          this.institution = medicals.institution;
          this.dataSource.data = this.institution.users;
        }
    );
  }

  filterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
