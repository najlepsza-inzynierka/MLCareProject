import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Visit} from '../interfaces/visit';
import {Patient} from '../interfaces/patient';


const baseUrl = 'api/visits';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  visit: Visit;

  constructor(private http: HttpClient) { }

  getAllPatientVisits(patientId){
    return this.http.get<Visit[]>(`${baseUrl}/${patientId}`);
  }
}
