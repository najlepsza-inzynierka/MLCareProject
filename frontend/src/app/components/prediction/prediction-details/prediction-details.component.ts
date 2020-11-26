import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../../services/prediction.service';
import {ActivatedRoute} from '@angular/router';
import * as CanvasJS from '../../../../canvasjs.min';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-prediction-details',
  templateUrl: './prediction-details.component.html',
  styleUrls: ['./prediction-details.component.css']
})
export class PredictionDetailsComponent implements OnInit {
  prediction;
  imagePath;
  imageBytes;
  constructor(private predictionService: PredictionService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.predictionService.prediction){
      this.predictionService.getPrediction(this.route.snapshot.paramMap.get('predictionId')).subscribe(
          p => {
                this.prediction = p;
                console.log(this.prediction);
                this.drawChart();
                this.readImage();
                console.log(this.imagePath);
          }
          );
    }
    else{
      this.prediction = this.predictionService.prediction;
      this.drawChart();
    }
    console.log(this.prediction);
  }

  drawChart(){
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Probability'
      },
      data: [{
        type: 'column',
        dataPoints: [
          { y: (this.prediction.probability_map.Healthy * 100), label: 'Healthy' },
          { y: (this.prediction.probability_map.Unhealthy * 100), label: 'Unhealthy' },
        ]
      }]
    });

    chart.render();
  }

  readImage(){
    this.imageBytes = this.prediction.image.split('\'')[1];
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.imageBytes);
  }

}
