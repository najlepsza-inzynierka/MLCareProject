import {Component, Input, OnInit} from '@angular/core';
import {PatientService} from '../../services/patient.service';
import {Patient} from '../../interfaces/patient';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import { Visit } from 'src/app/interfaces/visit';
import {VisitService} from '../../services/visit.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patientVisit: Visit[];
  dataSource: MatTableDataSource<Visit>;
  genderMap = {0: 'Male', 1: 'Female'};
  @Input() patient: Patient;
  displayedColumns: string[] = ['id', 'visitDate', 'doctorId', 'doctorName'];
  constructor(private patientService: PatientService,
              private visitService: VisitService,
              private route: ActivatedRoute,
              private location: Location) {
    this.dataSource = new MatTableDataSource(this.patientVisit);
  }

  ngOnInit(): void {
    this.getPatient();
    this.loadVisits();
  }

  loadVisits(){
    const id = this.route.snapshot.paramMap.get('id');
    this.visitService.getAllPatientVisits(id).subscribe(
        visits => {
          this.dataSource.data = visits;
          this.patientVisit = visits;
        }
    );
  }

  getPatient(){
    if (this.patientService.wentBack && this.patientService.patient) {
      this.patient = this.patientService.patient;
    }
    else {
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      this.patientService.getPatient(id).subscribe(patient => {
        this.patient = patient;
        this.patientService.patient = patient;
      });
    }
  }

  goBack(): void {
    this.patientService.wentBack = false;
    this.location.back();
  }

  filterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
