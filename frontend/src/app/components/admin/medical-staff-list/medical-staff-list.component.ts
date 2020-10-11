import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {Medical} from '../../../interfaces/medical';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-medical-staff-list',
  templateUrl: './medical-staff-list.component.html',
  styleUrls: ['./medical-staff-list.component.css']
})
export class MedicalStaffListComponent implements OnInit {

  medicals: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birth', 'address'];
  dataSource: MatTableDataSource<any>;
  constructor(private adminService: AdminService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.medicals);
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.adminService.getAllMedicals().
    subscribe(medicals => {this.medicals = medicals.institution.users;
                           console.log(medicals);
                           this.dataSource.data = this.medicals;
    }
    );
  }

  filterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
