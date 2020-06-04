import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../services/prediction.service';

@Component({
  selector: 'app-prediction-details',
  templateUrl: './prediction-details.component.html',
  styleUrls: ['./prediction-details.component.css']
})
export class PredictionDetailsComponent implements OnInit {
  prediction;
  constructor(private predictionService: PredictionService) {
    this.prediction = this.predictionService.prediction;
  }

  ngOnInit(): void {
  }

}
