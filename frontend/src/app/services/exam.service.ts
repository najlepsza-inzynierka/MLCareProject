import { Injectable } from '@angular/core';
import {Exam} from '../interfaces/exam';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'api/exams';
const examUrl = 'api/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  exam: Exam;

  constructor(private http: HttpClient) { }

  deleteExam(id){
    return this.http.delete(`${baseUrl}/delete_exam/${id}`);
  }

  createExam(exam){
    return this.http.post(baseUrl, exam);
  }

  updateExam(exam, id){
    return this.http.put(`${baseUrl}/update/${id}`, exam);
  }

}
