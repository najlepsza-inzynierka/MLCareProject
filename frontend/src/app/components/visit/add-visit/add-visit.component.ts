import { Component, OnInit } from '@angular/core';
import {Visit} from '../../../interfaces/visit';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Exam} from '../../../interfaces/exam';
import {VisitService} from '../../../services/visit.service';
import {ActivatedRoute} from '@angular/router';
import {Feature} from '../../../interfaces/feature';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FeatureGroup} from '../../../interfaces/feature-group';
import {Observable} from 'rxjs';
import {PredictionService} from '../../../services/prediction.service';
import {map, startWith} from 'rxjs/operators';

export const autocompletefilter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', '../../patient/add-patient/add-patient.component.css', './add-visit.component.css']
})
export class AddVisitComponent implements OnInit {
  visit: Visit;
  exam: Exam;
  feature: Feature;
  diseases;
  added = false;
  hidden = true;
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

  constructor(private visitService: VisitService,
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
      doctorId: '',
      doctorName: '',
      exams: [],
      predictions: []
    };
  }

  getDiseases(){
    this.predictionService.getDiseases().subscribe(d => {
      this.diseases = d;
      this.diseases.forEach(item => {
        if (item.disease_tag === 'acute_inflammations'){
          this.featureGroup[0].names = item.feature_importances.all.map(a => a[2]);
          this.featureGroup[0].real_names = item.feature_importances.all.map(a => a[0]);
        } else if (item.disease_tag === 'breast_cancer_wisconsin'){
          this.featureGroup[1].names = item.feature_importances.all.map(a => a[2]);
          this.featureGroup[1].real_names = item.feature_importances.all.map(a => a[0]);
        } else if (item.disease_tag === 'breast_cancer_coimbra'){
          this.featureGroup[2].names = item.feature_importances.all.map(a => a[2]);
          this.featureGroup[2].real_names = item.feature_importances.all.map(a => a[0]);
        }
      });
    });
  }

  pushAndClearFeatureData(){
    for (const dis of this.featureGroup){
      for (let i = 0; i < dis.names.length; ++i){
        if (dis.names[i] === this.feature.name){
          this.feature.name = dis.real_names[i];
        }
      }
    }
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
    this.visitService.createVisit(patientId, this.visit).subscribe(
        response => {
          this.added = true;
          console.log(this.visit);
          this.clearVisitData();
          this.openSnackBar('Visit added successfully', 'Close');
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
