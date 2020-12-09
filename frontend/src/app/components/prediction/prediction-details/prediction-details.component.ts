import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../../services/prediction.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-prediction-details',
  templateUrl: './prediction-details.component.html',
  styleUrls: ['../../patient/add-patient/add-patient.component.css', './prediction-details.component.css']
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
                this.readImage();
                console.log(this.imagePath);
          }
          );
    }
    else{
      this.prediction = this.predictionService.prediction;
    }
    console.log(this.prediction);
  }


  readImage(){
    this.imageBytes = this.prediction.image.split('\'')[1];
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.imageBytes);
  }

}
