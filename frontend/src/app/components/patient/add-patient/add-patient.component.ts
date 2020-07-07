import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Patient} from '../../../interfaces/patient';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patient: Patient;
  added = false;
  constructor(private patientService: PatientService, private snaackBar: MatSnackBar) {
    this.clearPatientData();
  }

  ngOnInit(): void {
  }

  savePatient(){
    this.added = false;
    this.patientService.createPatient(this.patient).subscribe(
        response => {
          console.log(response);
          this.added = true;
          this.clearPatientData();
          this.openSnackBar('Patient added successfully', 'Close');
        },
        error => {
          this.openSnackBar(error.error.message, 'Close');
          console.log(error);
        }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

  clearPatientData(){
    this.added = false;
    this.patient = {
      _id: '-1',
      patientId: '',
      gender: -1,
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      birthDate: '',
      birthPlace: '',
      phoneNumber: '',
      email: '',
      visits: [],
      predictions: []
    };
  }

}
