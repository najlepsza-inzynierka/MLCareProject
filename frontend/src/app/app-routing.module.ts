import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientsComponent} from './components/patients/patients.component';
import {PatientDetailsComponent} from './components/patient-details/patient-details.component';
import {AddPatientComponent} from './components/add-patient/add-patient.component';
import {VisitDetailsComponent} from './components/visit-details/visit-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'patients', component: PatientsComponent },
  { path: 'patient/:id', component: PatientDetailsComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'patient/:id/:visitId', component: VisitDetailsComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
