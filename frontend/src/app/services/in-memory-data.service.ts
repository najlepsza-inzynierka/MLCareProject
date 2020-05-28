import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Patient } from '../interfaces/patient';
import {Feature} from '../interfaces/feature';
import {Exam} from '../interfaces/exam';
import {Disease} from '../interfaces/disease';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // patients part
    const doctors = [{doctorId: 19, doctorName: 'Jan Brzechwa'},
      {doctorId: 20, doctorName: 'Juliusz Słowacki'},
      {doctorId: 22, doctorName: 'Severus Snape'}];
    const localFeatures: Feature[] = [{name: 'parametr1', value: 10, unit: 'g'},
      {name: 'parametr2', value: 20, unit: 'g'},
      {name: 'parametr3', value: 30, unit: 'g'}];
    const localExams: Exam[] = [
      {id: 1, name: 'krwi', date: '10.10.2019',
        features: localFeatures.slice(0, 2)},
      {id: 2, name: 'USG', date: '12.10.2019',
        features: localFeatures.slice(1, 3)},
      {id: 3, name: 'EKG', date: '13.10.2019',
        features: localFeatures.slice(0, 3)}
    ];
    const localPrediction = [{date: '11.10.2019', disease: 'choroba',
      description: 'upsik'}];
    const localVisits = [{id: 1, date: '09.10.2019',
      doctor: doctors[0], exams: localExams.slice(0, 2),
      predictions: localPrediction},
      {id: 2, date: '10.10.2019',
        doctor: doctors[1], exams: localExams.slice(1, 3),
        predictions: localPrediction},
      {id: 4, date: '09.10.2019',
        doctor: doctors[2], exams: localExams,
        predictions: localPrediction}, ];
    const patients = [
      { id: 1, patientId: '989898989898', gender: '0', address: 'Miasto w mieście', birthDate: '01.02.1960',
        birthPlace: 'Bytom', phoneNumber: '123456789', email: 'mail@pe.el', firstName: 'Jan', middleName: '',
        lastName: 'Kowalski', visits: localVisits },
      { id: 2, patientId: '01', gender: '0', address: 'Hogwart', birthDate: '30.07.1990',
        birthPlace: 'Dolina Godryka', phoneNumber: '123456789', email: 'magiczny@harry.hg', firstName: 'Harry', middleName: '',
        lastName: 'Potter', visits: localVisits.slice(0, 2) },
      { id: 3, patientId: '777', gender: '0', address: 'Anglia', birthDate: '21.10.1920',
        birthPlace: 'Bytom', phoneNumber: '123456789', email: 'mail@pe.el', firstName: 'James', middleName: '',
        lastName: 'Bond', visits: localVisits.slice(0, 1) },
      { id: 4, patientId: '989898989898', gender: '0', address: 'Hogwart', birthDate: '01.02.1880',
        birthPlace: 'Dolina Godryka', phoneNumber: '123456789', email: 'eeee@ze.co', firstName: 'Albus', middleName: 'Persiwal',
        lastName: 'Dumbledore', visits: localVisits.slice(1, 3) },
    ];

    // predictions part
    const predictions = [];

    // diseases part
    const diseases: Disease[] = [{id: 1, name: 'Hemophilia', neededFeatures: localFeatures.slice(0, 1)},
      {id: 2, name: 'Cholera', neededFeatures: localFeatures.slice(1, 2)},
      {id: 3, name: 'Anemia', neededFeatures: localFeatures.slice(0, 2)}];
    return {patients, predictions, diseases};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the patients array is empty,
  // the method below returns the initial number (1).
  // if the patients array is not empty, the method below returns the highest
  // patient id + 1.
  genId(patients: Patient[]): number {
    return patients.length > 0 ? Math.max(...patients.map(patient => +patient._id)) + 1 : 1;
  }
}
