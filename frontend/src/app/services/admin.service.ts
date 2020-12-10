import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Medical} from '../interfaces/medical';

const uri = 'http://localhost:5000';
const registerURL = `${uri}/api/users/register`;
const registerForceURL = `${uri}/api/users/register/force`;
const medicalURL = `${uri}/api/admins/institution`;
const adminURL = `${uri}api/admins`;


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // medical part
  createMedical(medical){
    return this.http.post(registerURL, medical);
  }

  createMedicalForce(medical){
    return this.http.post(registerForceURL, medical);
  }

  getAllMedicals(){
    return this.http.get<any>(medicalURL);
  }

  getMedical(id){
    return this.http.get<any>(`${adminURL}/user/${id}`);
  }

  // admin part
  getAdmin(){
    return this.http.get<any>(`${adminURL}/admin`);
  }

  updateAdmin(admin, id){
    return this.http.put(`${adminURL}/update/${id}`, admin);
  }

}
