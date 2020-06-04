import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'api/visit';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  prediction;

  constructor(private http: HttpClient) { }

  createVisitPrediction(visitId){
    return this.http.post(`${baseUrl}/${visitId}/make_prediction`, {
      disease: 'breast cancer',
      features: [
        {
          name: 'Age',
          value: 22
        },
        {
          name: 'BMI',
          value: 23.7
        },
        {
          name: 'Glucose',
          value: 73
        },
        {
          name: 'Insulin',
          value: 3.01
        },
        {
          name: 'HOMA',
          value: 0.61245
        },
        {
          name: 'Leptin',
          value: 8.7657
        },
        {
          name: 'Adiponectin',
          value: 13.11
        },
        {
          name: 'Resistin',
          value: 6.92
        },
        {
          name: 'MCP.1',
          value: 711.33
        }]
    });
  }
}
