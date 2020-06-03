import {Exam} from './exam';
import {Prediction} from './prediction';

export interface Visit {
  _id: string;
  date: string;
  doctorId: string;
  doctorName: string;
  exams: Exam[];
  predictions: Prediction[];
}
