import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-prediction',
  templateUrl: './add-prediction.component.html',
  styleUrls: ['./add-prediction.component.css']
})
export class AddPredictionComponent implements OnInit {

  diseases;
  constructor() { }

  ngOnInit(): void {
    this.getDiseases();
  }

  getDiseases(){
    this.diseases = {
      
    };
  }

}
