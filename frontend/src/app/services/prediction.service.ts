import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'api/visit';
const predictionUrl = 'api/prediction';
const diseasesUrl = 'api/diseases';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  prediction;

  constructor(private http: HttpClient) { }

  getPrediction(predictionId){
    return this.http.get(`${predictionUrl}/${predictionId}`);
  }

  createVisitPrediction(visitId, prediction){
    return this.http.post(`${baseUrl}/${visitId}/make_prediction`, prediction);
  }

  createMultiplePredictions(visitId, predictionsData){
    return this.http.post(`${baseUrl}/${visitId}/make_multi_prediction`, predictionsData);
  }

  getDiseases(){
    return this.http.get(`${diseasesUrl}`);
  }
}
