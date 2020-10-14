import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-medical-staff-list',
  templateUrl: './medical-staff-list.component.html',
  styleUrls: ['./medical-staff-list.component.css']
})
export class MedicalStaffListComponent implements OnInit {
  institution: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'email', 'phoneNumber'];
  dataSource: MatTableDataSource<any>;
  constructor(private adminService: AdminService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.institution);
  }

  ngOnInit(): void {
    this.getMedical();
  }

  getMedical(){
    this.adminService.getAllMedicals().
    subscribe(medicals => {
                           this.institution = medicals.institution;
                           console.log(medicals);
                           this.dataSource.data = this.institution.users;
    }
    );
  }

  filterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
