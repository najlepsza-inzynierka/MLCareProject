import { Component, OnInit } from '@angular/core';
import {Visit} from '../../interfaces/visit';
import {PatientService} from '../../services/patient.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Exam} from '../../interfaces/exam';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent implements OnInit {
  visit: Visit;
  added = false;

  constructor(private patientService: PatientService, private snaackBar: MatSnackBar) {
    this.clearVisitData();
  }

  ngOnInit(): void {
  }

  clearVisitData(){
    this.added = false;
    this.visit = {
      _id: '-1',
      date: '',
      doctorId: '',
      doctorName: '',
      exams: [],
      predictions: []
    };
  }

}
