import { Injectable } from '@angular/core';
import {Exam} from '../interfaces/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  exam: Exam;

  constructor() { }
}
