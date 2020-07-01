import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Visit} from '../interfaces/visit';
import {Observable} from 'rxjs';


const baseUrl = 'api/visits';
const visitUrl = 'api/visit';
const addUrl = 'api/patient';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  visit: Visit;

  constructor(private http: HttpClient) { }

  getAllPatientVisits(patientId){
    return this.http.get<Visit[]>(`${baseUrl}/${patientId}`);
  }

  getVisit(visitId): Observable<Visit>{
    return this.http.get<Visit>(`${visitUrl}/${visitId}`);
  }

  createVisit(patientId, visit){
    return this.http.post(`${addUrl}/${patientId}/add_visit`, visit);
  }

  deleteVisit(id) {
    return this.http.delete(`${baseUrl}/delete_visit/${id}`);
  }
}
