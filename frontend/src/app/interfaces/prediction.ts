import {Feature} from './feature';

export interface Prediction {
    disease: string;
    features: Feature;
}
