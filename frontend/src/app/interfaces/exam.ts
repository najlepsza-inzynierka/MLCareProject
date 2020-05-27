import {Feature} from './feature';

export interface Exam {
  id: number;
  name: string;
  date: string;
  features: Feature[];
}
