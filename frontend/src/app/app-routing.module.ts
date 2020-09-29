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
import {AuthGuard} from './auth.guard';
import {LoginScreenComponent} from "./components/login-screen/login-screen.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginScreenComponent},
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id', component: PatientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'patient/edit/:id', component: EditPatientComponent, canActivate: [AuthGuard]  },
  { path: 'patient/:id/prediction/:predictionId', component: PredictionDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'patient/:id/:visitId', component: VisitDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'patient/:id/visit/edit/:visitId', component: EditVisitComponent, canActivate: [AuthGuard]  },
  { path: 'patient/:id/add-exam/:visitId', component: AddExamComponent, canActivate: [AuthGuard]  },
  { path: 'add-patient', component: AddPatientComponent, canActivate: [AuthGuard]  },
  { path: 'add_visit/:id', component: AddVisitComponent, canActivate: [AuthGuard]  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
