import {Visit} from './visit';

export interface Patient {
  _id: string;
  patientId: string;
  gender: number;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  phoneNumber: string;
  email: string;
  visits: Visit[];
    predictions: {
      date: string,
      disease: string,
      description: string,
    }[];
}
