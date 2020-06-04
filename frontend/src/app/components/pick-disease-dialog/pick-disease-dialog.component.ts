import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Disease} from '../../interfaces/disease';
import {PredictionService} from '../../services/prediction.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pick-disease-dialog',
  templateUrl: './pick-disease-dialog.component.html',
  styleUrls: ['./pick-disease-dialog.component.css']
})
export class PickDiseaseDialogComponent implements OnInit {
  diseases: Disease[];
  checkbox: boolean;
  prediction;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private predictionService: PredictionService,
              private route: ActivatedRoute,
              private router: Router) {
    this.diseases = data.dis;
  }

  ngOnInit(): void {
  }

  predictDiseases(){
    this.predictionService.createVisitPrediction(this.data.visitId).subscribe(p => {
      this.prediction = p;
      this.predictionService.prediction = p;
      console.log(p);
      this.router.navigateByUrl(`patient/${this.data.patientId}/prediction/${this.prediction._id}`);
    });
  }

}
