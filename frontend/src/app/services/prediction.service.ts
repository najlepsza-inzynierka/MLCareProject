import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prediction} from '../interfaces/prediction';

const uri = 'http://localhost:5000';
const baseUrl = `${uri}/api/visit`;
const predictionUrl = `${uri}/api/prediction`;
const diseasesUrl = `${uri}/api/diseases`;

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  prediction;

  constructor(private http: HttpClient) { }

  getPrediction(predictionId){
    return this.http.get(`${predictionUrl}/${predictionId}`);
  }

  getPredictionsByVisit(visitId){
    return this.http.get<any>(`${predictionUrl}s/${visitId}`);
  }

  createVisitPrediction(visitId, prediction){
    return this.http.post(`${baseUrl}/${visitId}/make_prediction`, prediction);
  }

  createMultiplePredictions(visitId, predictionsData){
    return this.http.post<Prediction>(`${baseUrl}/${visitId}/make_multi_prediction`, predictionsData);
  }

  deletePrediction(id){
    return this.http.delete(`${predictionUrl}s/delete_prediction/${id}`);
  }

  getDiseases(){
    return this.http.get(`${diseasesUrl}`);
  }
}
