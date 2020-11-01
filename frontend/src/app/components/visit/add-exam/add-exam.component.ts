import { Component, OnInit } from '@angular/core';
import {Exam} from '../../../interfaces/exam';
import {Feature} from '../../../interfaces/feature';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExamService} from '../../../services/exam.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FeatureGroup} from '../../../interfaces/feature-group';
import {PredictionService} from '../../../services/prediction.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export const autocompletefilter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', './add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  exam: Exam;
  feature: Feature;
  diseases;
  added = false;
  featureForm: FormGroup = this.formBuilder.group({
    featureGroup: '',
  });
  featureGroup: FeatureGroup[] = [{
    disease: 'acute_inflammations',
    names: [],
    real_names: []
  }, {
    disease: 'breast_cancer_wisconsin',
    names: [],
    real_names: []
  }, {
    disease: 'breast_cancer_coimbra',
    names: [],
    real_names: []
  }];
  featureGroupOptions: Observable<FeatureGroup[]>;

  constructor(private examService: ExamService,
              private predictionService: PredictionService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private location: Location,
              private snaackBar: MatSnackBar) {
    this.clearVisitData();
    this.getDiseases();
  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.featureGroupOptions = this.featureForm.get('featureGroup')!.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filterGroup(value))
        );
  }

  getDiseases(){
    this.predictionService.getDiseases().subscribe(d => {
      this.diseases = d;
      console.log(d);
      this.diseases.forEach(item => {
        if (item.disease_tag === 'acute_inflammations'){
          this.featureGroup[0].names = item.feature_importances.all.map(a => a[2]);
          this.featureGroup[0].real_names = item.feature_importances.all.map(a => a[0]);
        } else if (item.disease_tag === 'breast_cancer_wisconsin'){
          this.featureGroup[1].names = item.feature_importances.all.map(a => a[2]);
          this.featureGroup[0].real_names = item.feature_importances.all.map(a => a[0]);
        } else if (item.disease_tag === 'breast_cancer_coimbra'){
          this.featureGroup[2].names = item.feature_importances.all.map(a => a[2]);
          this.featureGroup[0].real_names = item.feature_importances.all.map(a => a[0]);
        }
      });
      console.log(this.featureGroup);
    });
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
    this.examService.createExam(visitId, this.exam).subscribe(
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

  private _filterGroup(value: string): FeatureGroup[] {
    if (value) {
      return this.featureGroup
          .map(group => ({disease: group.disease, names: autocompletefilter(group.names, value), real_names: group.real_names}))
          .filter(group => group.names.length > 0);
    }
  }
}
