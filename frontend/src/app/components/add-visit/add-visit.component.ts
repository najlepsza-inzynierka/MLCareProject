import { Component, OnInit } from '@angular/core';
import {Visit} from '../../interfaces/visit';
import {PatientService} from '../../services/patient.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Exam} from '../../interfaces/exam';
import {VisitService} from '../../services/visit.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent implements OnInit {
  visit: Visit;
  added = false;

  constructor(private visitService: VisitService,
              private route: ActivatedRoute,
              private snaackBar: MatSnackBar) {
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

  saveVisit(){
    this.added = false;
    const patientId = this.route.snapshot.paramMap.get('id');
    this.visitService.createVisit(patientId, this.visit).subscribe(
        response => {
          console.log(response);
          this.added = true;
          this.clearVisitData();
          this.openSnackBar('Visit added successfully', 'Close');
        },
        error => {
          console.log(error);
        }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

}
