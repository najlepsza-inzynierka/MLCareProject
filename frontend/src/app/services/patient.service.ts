import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Patient} from '../interfaces/patient';
import {Observable} from 'rxjs';
import {Disease} from '../interfaces/disease';

const uri = 'http://localhost:5000';
const baseURL = `${uri}/api/patients`;
const patientURL = `${uri}/api/patient`;
const diseaseURL = `${uri}/api/diseases`;

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patient: Patient;
  wentBack: boolean;

  constructor(private http: HttpClient) { }

  getAllPatients(){
    return this.http.get<Patient[]>(baseURL);
  }

  getAllDiseases(){
    return this.http.get<Disease[]>(diseaseURL);
  }

  getPatient(id): Observable<Patient>{
    return this.http.get<Patient>(`${patientURL}/${id}`);
  }

  createPatient(patient){
    return this.http.post(baseURL, patient);
  }

  updatePatient(patient, id){
    return this.http.put(`${baseURL}/update/${id}`, patient);
  }

  deletePatient(id) {
    return this.http.delete(`${baseURL}/delete_patient/${id}`);
  }

  deleteAllPatients() {
    return this.http.delete(baseURL);
  }

  findByName(name) {// todo - is this needed?
    return this.http.get(`${baseURL}?name=${name}`);
  }

}
