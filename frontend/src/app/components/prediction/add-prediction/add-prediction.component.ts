import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../../services/prediction.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-prediction',
  templateUrl: './add-prediction.component.html',
  styleUrls: ['./add-prediction.component.css']
})
export class AddPredictionComponent implements OnInit {
  diseases;
  diseasesFormGroup: FormGroup;
  selected;
  dis;

  constructor(private predictionService: PredictionService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDiseases();
  }

  getDiseases(){
    this.predictionService.getDiseases().subscribe(d => {
      this.diseases = d;
      this.diseasesFormGroup = this.formBuilder.group({
        diseases: this.formBuilder.array([])
      });
    });
  }

  onChange(event){
    const diseases = this.diseasesFormGroup.get('diseases') as FormArray;
    if (event.checked){
      diseases.push(new FormControl(event.source.value));
    } else{
      const i = diseases.controls.findIndex(d => d.value === event.source.value);
      diseases.removeAt(i);
    }
  }

  submit(){
    const diseasesName = this.diseasesFormGroup.value.map(d => d.name);
    console.log(this.diseasesFormGroup.value);
    this.predictionService.createMultiplePredictions('5f99d07e9b3b3436da81eab2',
        {diseases: diseasesName,
        features: [{name: 'Nausea', value: 'True'}]}).subscribe(e => console.log(e));
  }
}
