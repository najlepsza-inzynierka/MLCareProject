import { Component, OnInit } from '@angular/core';
import {Exam} from '../../../interfaces/exam';
import {Feature} from '../../../interfaces/feature';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExamService} from '../../../services/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  exam: Exam;
  feature: Feature;
  added = false;

  constructor(private examService: ExamService,
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

  }

  saveVisitData(){
    this.added = false;
    this.pushAndClearFeatureData();

  }

  pushAndClearFeatureData(){
    this.exam.features.push(this.feature);
    this.feature = {
      name: '',
      value: 0,
      unit: ''
    };
  }

  saveExam(){
    this.added = false;
    const visitId = this.route.snapshot.paramMap.get('visitId');
    // this.exam.visitId = visitId;
    console.log(this.exam);
    this.examService.createExam(this.exam).subscribe(
        response => {
          console.log(response);
          this.added = true;
          this.clearVisitData();
          this.openSnackBar('Exam added successfully', 'Close');
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
