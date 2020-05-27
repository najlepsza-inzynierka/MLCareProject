import {Exam} from './exam';

export interface Visit {
  id: number;
  date: string;
  doctor: {
    doctorId: number;
    doctorName: string;
  };
    exams: Exam[];
    predictions: [{
      date: string,
      disease: string,
      description: string,
    }];
}
