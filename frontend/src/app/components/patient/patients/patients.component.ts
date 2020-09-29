import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../interfaces/patient';
import {PatientService} from '../../../services/patient.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birth', 'address'];
  dataSource: MatTableDataSource<Patient>;
  constructor(private patientService: PatientService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.patients);
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.patientService.wentBack = false;
    this.patientService.getAllPatients().
      subscribe(patients => {this.patients = patients;
                             console.log(patients);
                             this.dataSource.data = patients; }
      );
  }

  filterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
