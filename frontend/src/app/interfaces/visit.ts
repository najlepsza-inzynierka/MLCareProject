import {Exam} from './exam';

export interface Visit {
  id: number;
  date: string;
  doctorId: string;
  doctorName: string;
    exams: Exam[];
    predictions: [{
      date: string,
      disease: string,
      description: string,
    }];
}
