import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../services/prediction.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-prediction-details',
  templateUrl: './prediction-details.component.html',
  styleUrls: ['./prediction-details.component.css']
})
export class PredictionDetailsComponent implements OnInit {
  prediction;
  constructor(private predictionService: PredictionService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    if (!this.predictionService.prediction){
      this.predictionService.getPrediction(this.route.snapshot.paramMap.get('predictionId')).subscribe(
          p => {this.prediction = p;     console.log(this.prediction); }
          );
    }
    else{
      this.prediction = this.predictionService.prediction;
    }
    console.log(this.prediction);
  }

}
