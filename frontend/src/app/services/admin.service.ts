import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Medical} from '../interfaces/medical';
import {Admin} from '../interfaces/admin';

const baseURL = 'api/medical';
const medicalURL = 'api/medicals';
const adminURL = 'api/admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // medical part
  createMedical(medical){
    return this.http.post(baseURL, medical);
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
