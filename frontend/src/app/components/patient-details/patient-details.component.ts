import {Component, Input, OnInit} from '@angular/core';
import {PatientService} from '../../services/patient.service';
import {Patient} from '../../interfaces/patient';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import { Visit } from 'src/app/interfaces/visit';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patientVisit: Visit[];
  dataSource: MatTableDataSource<Visit>;
  @Input() patient: Patient;
  displayedColumns: string[] = ['id', 'visitDate', 'doctorId', 'doctorName'];
  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private location: Location) {
    this.dataSource = new MatTableDataSource(this.patientVisit);
  }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(){
    if (this.patientService.wentBack) {
      this.patient = this.patientService.patient;
      this.dataSource.data = this.patient.visits;
    }
    else {
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      this.patientService.getPatient(id).subscribe(patient => {
        this.patient = patient;
        this.dataSource.data = patient.visits;
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
