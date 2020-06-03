import {Feature} from './feature';

export interface Exam {
  _id: number;
  name: string;
  date: string;
  features: Feature[];
}
