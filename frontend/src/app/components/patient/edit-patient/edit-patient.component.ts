import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {Patient} from '../../../interfaces/patient';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', '../add-patient/add-patient.component.css', './edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  patient: Patient;
  id;
  result = false;
  hidden = true;

  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public dialog: MatDialog,
              private snaackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(this.id).subscribe(patient => this.patient = patient);
  }

  savePatient(){
    this.patientService.updatePatient(this.patient, this.id).subscribe(
        response => {
          this.openSnackBar('Patient edited successfully', 'Close');
          this.goBack();
        },
        error => {
          this.openSnackBar(error.error.message, 'Close');
        }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

  confirmDialog(): void {
    const message = `Are you sure you want to delete patient?`;

    const dialogData = new ConfirmDialogModel('Confirm Delete', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult){
        this.patientService.deletePatient(this.patient._id).subscribe(response => {
              this.openSnackBar('Patient deleted successfully', 'Close');
              this.router.navigateByUrl(`patients`);
            },
            error => {
              this.openSnackBar(error.error.message, 'Close');
            }
        );
      }
    });
  }

  goBack(){
    this.location.back();
  }

}
