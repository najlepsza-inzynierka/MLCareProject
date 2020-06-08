import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientsComponent} from './components/patients/patients.component';
import {PatientDetailsComponent} from './components/patient-details/patient-details.component';
import {AddPatientComponent} from './components/add-patient/add-patient.component';
import {VisitDetailsComponent} from './components/visit-details/visit-details.component';
import {AddVisitComponent} from './components/add-visit/add-visit.component';
import {PredictionDetailsComponent} from './components/prediction-details/prediction-details.component';

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
