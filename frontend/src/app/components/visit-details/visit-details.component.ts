import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../services/patient.service';
import {Visit} from '../../interfaces/visit';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {Exam} from '../../interfaces/exam';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {PickDiseaseDialogComponent} from '../pick-disease-dialog/pick-disease-dialog.component';
import {Disease} from '../../interfaces/disease';

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
  columnsToDisplay = ['Id', 'Name', 'Date'];
  featuresColumnsToDisplay = ['featureName', 'featureValue'];
  expandedElement: Exam | null;
  diseases: Disease[];


  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Exam>();
    this.loadVisit();
    this.loadDiseases();
  }

  ngOnInit(): void {
  }

  loadVisit(){
    const visitId = +this.route.snapshot.paramMap.get('visitId');
    if (this.patientService.patient != null){
      this.visit = this.patientService.patient.visits.filter(visit => visit.id === visitId)[0];
      this.dataSource.data = this.visit.exams;
    } else {
      const patientId = +this.route.snapshot.paramMap.get('id');
      this.patientService.getPatient(patientId).subscribe(patient => { this.patientService.patient = patient;
                                                                       this.visit = patient.visits.filter(visit => visit.id === visitId)[0];
                                                                       this.dataSource.data = this.visit.exams;
      });

    }
  }

  loadDiseases(){
    this.patientService.getAllDiseases().subscribe(diss => this.diseases = diss);
  }

  openPickDiseases(){
    const dis = this.diseases;
    console.log(dis);
    this.dialog.open(PickDiseaseDialogComponent, {
      data: {dis}
    });
  }

  openPickExams(){

  }

  goBack(): void {
    this.patientService.wentBack = true;
    this.location.back();
  }

}
