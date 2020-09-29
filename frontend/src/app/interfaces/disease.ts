import {Feature} from './feature';

export interface Disease {
  _id: number;
  name: string;
  neededFeatures: Feature[];
}
