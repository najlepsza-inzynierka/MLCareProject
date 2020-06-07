import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientsComponent} from './components/patient/patients/patients.component';
import {PatientDetailsComponent} from './components/patient/patient-details/patient-details.component';
import {AddPatientComponent} from './components/patient/add-patient/add-patient.component';
import {VisitDetailsComponent} from './components/visit/visit-details/visit-details.component';
import {AddVisitComponent} from './components/visit/add-visit/add-visit.component';
import {PredictionDetailsComponent} from './components/prediction/prediction-details/prediction-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'patients', component: PatientsComponent },
  { path: 'patient/:id', component: PatientDetailsComponent },
  { path: 'patient/:id/prediction/:predictionId', component: PredictionDetailsComponent },
  { path: 'patient/:id/:visitId', component: VisitDetailsComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'add_visit/:id', component: AddVisitComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
