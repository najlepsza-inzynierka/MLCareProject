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

  createExam(id, exam){
    return this.http.post(`/api/visit/${id}/add_exam`, exam);
  }

  updateExam(exam, id){
    return this.http.put(`${baseUrl}/edit_exam/${id}`, exam);
  }

}
