import { Component, OnInit } from '@angular/core';
import {Visit} from '../../../interfaces/visit';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Exam} from '../../../interfaces/exam';
import {VisitService} from '../../../services/visit.service';
import {ActivatedRoute} from '@angular/router';
import {Feature} from '../../../interfaces/feature';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', './add-visit.component.css']
})
export class AddVisitComponent implements OnInit {
  visit: Visit;
  exam: Exam;
  feature: Feature;
  added = false;

  constructor(private visitService: VisitService,
              private route: ActivatedRoute,
              private location: Location,
              private snaackBar: MatSnackBar) {
    this.clearVisitData();
  }

  ngOnInit(): void {
  }

  clearVisitData(){
    this.feature = {
      name: '',
      value: 0,
      unit: ''
    };
    this.exam = {
      name: '',
      date: '',
      features: []
    };
    this.visit = {
      _id: '-1',
      date: '',
      doctorId: '5ece8924947fa16b8c6129d5',
      doctorName: 'Pan Wilk',
      exams: [],
      predictions: []
    };
  }

  saveVisitData(){
    this.added = false;
    this.pushAndClearFeatureData();
    this.pushAndClearExamData();
    this.visit = {
      _id: '-1',
      date: '',
      doctorId: '5ece8924947fa16b8c6129d5',
      doctorName: 'Pan Wilk',
      exams: [],
      predictions: []
    };
  }

  pushAndClearFeatureData(){
    this.exam.features.push(this.feature);
    this.feature = {
      name: '',
      value: 0,
      unit: ''
    };
  }

  pushAndClearExamData(){
    this.visit.exams.push(this.exam);
    this.exam = {
      name: '',
      date: '',
      features: []
    };
  }

  saveVisit(){
    this.added = false;
    const patientId = this.route.snapshot.paramMap.get('id');
    console.log(this.visit);
    this.visitService.createVisit(patientId, this.visit).subscribe(
        response => {
          console.log(response);
          this.added = true;
          this.clearVisitData();
          this.openSnackBar('Visit added successfully', 'Close');
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
