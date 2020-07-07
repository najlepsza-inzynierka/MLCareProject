import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientsComponent} from './components/patient/patients/patients.component';
import {PatientDetailsComponent} from './components/patient/patient-details/patient-details.component';
import {AddPatientComponent} from './components/patient/add-patient/add-patient.component';
import {VisitDetailsComponent} from './components/visit/visit-details/visit-details.component';
import {AddVisitComponent} from './components/visit/add-visit/add-visit.component';
import {PredictionDetailsComponent} from './components/prediction/prediction-details/prediction-details.component';
import {EditPatientComponent} from './components/patient/edit-patient/edit-patient.component';
import {EditVisitComponent} from './components/visit/edit-visit/edit-visit.component';
import {AddExamComponent} from './components/visit/add-exam/add-exam.component';
import {AuthComponent} from './components/authentication/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // todo -> tutorial medium
  { path: 'patients', component: PatientsComponent },
  { path: 'patient/:id', component: PatientDetailsComponent },
  { path: 'patient/edit/:id', component: EditPatientComponent },
  { path: 'patient/:id/prediction/:predictionId', component: PredictionDetailsComponent },
  { path: 'patient/:id/:visitId', component: VisitDetailsComponent },
  { path: 'patient/:id/visit/edit/:visitId', component: EditVisitComponent },
  { path: 'patient/:id/add-exam/:visitId', component: AddExamComponent },
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
