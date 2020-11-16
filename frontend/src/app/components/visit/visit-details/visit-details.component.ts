import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {Visit} from '../../../interfaces/visit';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {Exam} from '../../../interfaces/exam';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {Disease} from '../../../interfaces/disease';
import {VisitService} from '../../../services/visit.service';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {ExamService} from '../../../services/exam.service';
import {Prediction} from '../../../interfaces/prediction';
import {PredictionService} from '../../../services/prediction.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VisitDetailsComponent implements OnInit {
  visit: Visit;
  predictions: Prediction[];
  dataSource: MatTableDataSource<Exam>;
  predictionDataSource: MatTableDataSource<Prediction>;
  columnsToDisplay = ['Name', 'Date', 'Action'];
  columnsToDisplayPrediction = ['Date', 'Disease', 'Result'];
  featuresColumnsToDisplay = ['featureName', 'featureValue'];
  expandedElement: Exam | null;
  diseases: Disease[];
  visitId;
  patientId;
  patientFirstName;
  patientMiddleName;
  patientLastName;


  constructor(private patientService: PatientService,
              private visitService: VisitService,
              private predictionService: PredictionService,
              private examService: ExamService,
              private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Exam>();
    this.predictionDataSource = new MatTableDataSource<Prediction>();
    this.visitId = this.route.snapshot.paramMap.get('visitId');
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.loadVisit();
    this.loadDiseases();
    this.loadPredictions();
    this.loadPatientName();
  }

  ngOnInit(): void {
  }

  loadVisit(){
    this.visitService.getVisit(this.visitId).subscribe(v => { this.visit = v;
                                                              console.log(v.exams);
                                                              this.dataSource.data = this.visit.exams;
      });
  }

  loadDiseases(){
    this.patientService.getAllDiseases().subscribe(diss => this.diseases = diss);
  }

  loadPredictions(){
    this.predictionService.getPredictionsByVisit(this.visitId).subscribe(p => {
      this.predictions = p.predictions;
      console.log(p);
      this.predictionDataSource.data = this.predictions;
    });
  }

  loadPatientName(){
    if (isNotNullOrUndefined(this.patientService.patient)){
      this.patientFirstName = this.patientService.patient.firstName;
      this.patientMiddleName = this.patientService.patient.middleName;
      this.patientLastName = this.patientService.patient.lastName;
    } else{
      this.patientService.getPatient(this.patientId).subscribe(p => {
        this.patientService.patient = p;
        this.patientFirstName = p.firstName;
        this.patientMiddleName = p.middleName;
        this.patientLastName = p.lastName;
      });
    }
  }

  goBack(): void {
    this.patientService.wentBack = true;
    this.location.back();
  }

  confirmDeleteVisitDialog(): void {
    const message = `Are you sure you want to delete visit?`;

    const dialogData = new ConfirmDialogModel('Confirm Delete', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult){
        this.visitService.deleteVisit(this.visit._id).subscribe(result => console.log(result),
            err => console.error(err));
      }
    });
  }

  confirmDeleteExamDialog(id): void {
    const message = `Are you sure you want to delete exam?`;

    const dialogData = new ConfirmDialogModel('Confirm Delete', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult){
        this.examService.deleteExam(id).subscribe(result => console.log(result),
            err => console.error(err));
      }
    });
  }

}
