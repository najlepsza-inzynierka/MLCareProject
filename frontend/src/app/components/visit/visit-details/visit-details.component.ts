import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {Visit} from '../../../interfaces/visit';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {Exam} from '../../../interfaces/exam';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {PickDiseaseDialogComponent} from '../../prediction/pick-disease-dialog/pick-disease-dialog.component';
import {Disease} from '../../../interfaces/disease';
import {VisitService} from '../../../services/visit.service';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {ExamService} from "../../../services/exam.service";

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
  dataSource: MatTableDataSource<Exam>;
  columnsToDisplay = ['Id', 'Name', 'Date', 'Action'];
  featuresColumnsToDisplay = ['featureName', 'featureValue'];
  expandedElement: Exam | null;
  diseases: Disease[];
  visitId;
  patientId;


  constructor(private patientService: PatientService,
              private visitService: VisitService,
              private examService: ExamService,
              private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Exam>();
    this.visitId = this.route.snapshot.paramMap.get('visitId');
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.loadVisit();
    this.loadDiseases();
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

  openPickDiseases(){
    const dis = this.diseases;
    const visitId = this.visitId;
    const patientId = this.patientId;

    console.log(dis);
    this.dialog.open(PickDiseaseDialogComponent, {
      data: {dis, visitId, patientId}
    });
  }

  openPickExams(){

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

  openDialog(message, message1){
    console.log(message);
  }

}
