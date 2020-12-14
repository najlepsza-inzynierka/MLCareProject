import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../../services/prediction.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';

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
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.predictionService.prediction){
      this.predictionService.getPrediction(this.route.snapshot.paramMap.get('predictionId')).subscribe(
          p => {
            console.log(p);
            this.prediction = p;
            this.readImage();
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

  goBack(){
    this.location.back();
  }

}
