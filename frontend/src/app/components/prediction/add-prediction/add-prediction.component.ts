import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../../services/prediction.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {VisitService} from '../../../services/visit.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-prediction',
  templateUrl: './add-prediction.component.html',
  styleUrls: ['../../patient/add-patient/add-patient.component.css', './add-prediction.component.css']
})
export class AddPredictionComponent implements OnInit {
  diseases;
  features;
  diseasesFormGroup: FormGroup;
  featuresFormGroup: FormGroup;
  selected;
  dis;
  visitId;
  id;
  visits;

  constructor(private predictionService: PredictionService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private visitService: VisitService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.visitId = this.route.snapshot.paramMap.get('visitId');
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDiseases();
    this.getVisits();
  }

  getDiseases(){
    this.predictionService.getDiseases().subscribe(d => {
      this.diseases = d;
      this.diseasesFormGroup = this.formBuilder.group({
        diseases: this.formBuilder.array([])
      });
    });
  }

  getVisits(){
    this.visitService.getVisit(this.visitId).subscribe(r => console.log(r));
    this.visitService.getAllPatientVisits(this.id).subscribe(
        visits => {
          this.visits = visits;
          console.log(visits);
          this.featuresFormGroup = this.formBuilder.group({
            features: this.formBuilder.array([])
          });
        }
    );
  }

  onChange(event){
    const diseases = this.diseasesFormGroup.get('diseases') as FormArray;
    if (event.checked){
      diseases.push(new FormControl(event.source.value));
    } else{
      const i = diseases.controls.findIndex(d => d.value === event.source.value);
      diseases.removeAt(i);
    }
    this.selected = this.diseasesFormGroup.value.diseases;
  }

  onFeatureChange(event){
    const features = this.featuresFormGroup.get('features') as FormArray;
    if (event.checked){
      features.push(new FormControl(event.source.value));
    } else{
      const i = features.controls.findIndex(d => d.value === event.source.value);
      features.removeAt(i);
    }
    this.features = this.diseasesFormGroup.value.features;
  }

  submit(){
    console.log(this.diseasesFormGroup.value);
    console.log(this.featuresFormGroup.value);
    const diseasesName = this.diseasesFormGroup.value.diseases.map(d => d.name);
    this.predictionService.createMultiplePredictions(this.visitId,
        {diseases: diseasesName,
        features: this.featuresFormGroup.value.features}).subscribe(response => {
          console.log(response);
          this.goBack();
    }, error => {
          console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
