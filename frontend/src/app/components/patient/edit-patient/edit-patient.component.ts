import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {Patient} from '../../../interfaces/patient';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  patient: Patient;
  id;

  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private location: Location,
              private snaackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(this.id).subscribe(patient => this.patient = patient);
  }

  savePatient(){
    this.patientService.updatePatient(this.patient, this.id).subscribe(
        response => {
          console.log(response);
          this.openSnackBar('Patient edited successfully', 'Close');
        },
        error => {
          this.openSnackBar('Something went wrong :(', 'Close');
          console.log(error);
        }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

  goBack(){
    this.location.back();
  }

}
