import {Feature} from './feature';

export interface Prediction {
    _id: string;
    addedBy: string;
    date: string;
    disease: string;
    features: Feature[];
    model: string;
    predicted_class: string;
    probability_map: {
        Healthy: number;
        Unhealthy: number;
    };
    visitId: string;
}
