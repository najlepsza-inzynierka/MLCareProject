import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Patient} from '../../interfaces/patient';
import {Disease} from '../../interfaces/disease';

@Component({
  selector: 'app-pick-disease-dialog',
  templateUrl: './pick-disease-dialog.component.html',
  styleUrls: ['./pick-disease-dialog.component.css']
})
export class PickDiseaseDialogComponent implements OnInit {
  diseases: Disease[];

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.diseases = data.dis;
  }

  ngOnInit(): void {
  }

  predictDiseases(){

  }

}
