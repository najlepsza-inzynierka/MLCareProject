import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Medical} from '../interfaces/medical';
import {Admin} from '../interfaces/admin';

const registerURL = '/api/users/register';
const registerForceURL = '/api/users/register/force';
const medicalURL = '/api/admins/institution';
const adminURL = 'api/admins';


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

  // admin part
  getAdmin(){
    return this.http.get<any>(`${adminURL}/admin`);
  }

  updateAdmin(admin, id){
    return this.http.put(`${adminURL}/update/${id}`, admin);
  }

}
