import {Feature} from './feature';

export interface Disease {
  id: number;
  name: string;
  neededFeatures: Feature[];
}
