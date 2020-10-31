import {Component, Input, OnInit} from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {Patient} from '../../../interfaces/patient';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import { Visit } from 'src/app/interfaces/visit';
import {VisitService} from '../../../services/visit.service';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PredictionService} from '../../../services/prediction.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patientVisit: Visit[];
  dataSource: MatTableDataSource<Visit>;
  genderMap = {0: 'Male', 1: 'Female'};
  result = false;
  @Input() patient: Patient;
  displayedColumns: string[] = ['id', 'visitDate', 'doctorId', 'doctorName'];
  constructor(private patientService: PatientService,
              private visitService: VisitService,
              private predictionService: PredictionService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public dialog: MatDialog,
              private snaackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.patientVisit);
  }

  ngOnInit(): void {
    this.getPatient();
    this.loadVisits();
  }

  deletePrediction(){ // todo trzeba przeniesc do wizyty pozniej
    this.predictionService.deletePrediction('5f9d6e4a30489d0cd678ca96').subscribe(e => console.log(e));
  }

  loadVisits(){
    const id = this.route.snapshot.paramMap.get('id');
    this.visitService.getAllPatientVisits(id).subscribe(
        visits => {
          this.dataSource.data = visits;
          this.patientVisit = visits;
          console.log(visits);
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
              console.log(response);
              this.openSnackBar('Patient deleted successfully', 'Close');
              this.router.navigateByUrl(`patients`);
            },
            error => {
              this.openSnackBar('Something went wrong :(', 'Close');
              console.log(error);
            }
        );
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 3000,
    });
  }

}
