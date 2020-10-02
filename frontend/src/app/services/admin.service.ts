import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Medical} from '../interfaces/medical';
import {Admin} from '../interfaces/admin';

const registerURL = '/api/users/register';
const medicalURL = 'api/medicals';
const adminURL = 'api/admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // medical part
  createMedical(medical){
    console.log();
    return this.http.post(registerURL, medical);
  }

  getAllMedicals(){
    return this.http.get<Medical[]>(medicalURL);
  }

  // admin part
  getAdmin(id){
    return this.http.get<Admin>(`${adminURL}/${id}`);
  }

  updateAdmin(admin, id){
    return this.http.put(`${adminURL}/update/${id}`, admin);
  }

}
