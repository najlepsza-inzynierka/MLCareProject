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
import {AuthGuard} from './guards/auth.guard';
import {LoginScreenComponent} from './components/login-screen/login-screen.component';
import {AdminLoginScreenComponent} from './components/admin/admin-login-screen/admin-login-screen.component';
import {AdminPanelComponent} from './components/admin/admin-panel/admin-panel.component';
import {AddMedicalStaffComponent} from './components/admin/add-medical-staff/add-medical-staff.component';
import {AdminGuard} from './guards/admin.guard';
import {EditAdminComponent} from './components/admin/edit-admin/edit-admin.component';
import {MedicalStaffDetailsComponent} from './components/admin/medical-staff-details/medical-staff-details.component';
import {AddPredictionComponent} from './components/prediction/add-prediction/add-prediction.component';
import {EditExamComponent} from './components/visit/edit-exam/edit-exam.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginScreenComponent},
    { path: 'patients', component: TopBarComponent, canActivate: [AuthGuard], children: [{
        path: '', component: PatientsComponent}] },
    { path: 'patient/:id', component: TopBarComponent, canActivate: [AuthGuard], children: [
          {path: '', component: PatientDetailsComponent}]},
    { path: 'patient/edit/:id', component: TopBarComponent, canActivate: [AuthGuard], children: [{
      path: '', component: EditPatientComponent}]  },
    { path: 'patient/:id/:visitId/prediction/:predictionId', component: TopBarComponent, canActivate: [AuthGuard], children: [{
      path: '', component: PredictionDetailsComponent}]  },
    { path: 'patient/:id/:visitId', component: TopBarComponent, canActivate: [AuthGuard], children: [{
      path: '', component: VisitDetailsComponent}]  },
    { path: 'patient/:id/visit/edit/:visitId', component: TopBarComponent, canActivate: [AuthGuard], children: [{
      path: '', component: EditVisitComponent}]  },
    { path: 'patient/:id/add-exam/:visitId', component: TopBarComponent, canActivate: [AuthGuard], children: [{
      path: '', component: AddExamComponent}]  },
    { path: 'add-patient', component: TopBarComponent, canActivate: [AuthGuard], children: [{
      path: '', component: AddPatientComponent}]  },
    { path: 'add_visit/:id', component: TopBarComponent, canActivate: [AuthGuard], children: [{
      path: '', component: AddVisitComponent}]  },
    { path: 'edit_exam/:visitId/:id', component: TopBarComponent, canActivate: [AuthGuard], children: [{
            path: '', component: EditExamComponent}]  },
    { path: 'patient/:id/:visitId/add-prediction', component: TopBarComponent, canActivate: [AuthGuard], children: [{
            path: '', component: AddPredictionComponent}]  },
    // admin
    { path: 'admin-login', component: AdminLoginScreenComponent},
    { path: 'admin-panel', component: TopBarComponent, canActivate: [AdminGuard], children: [{
      path: '', component: AdminPanelComponent}]},
    { path: 'user/:id', component: TopBarComponent, canActivate: [AdminGuard], children: [{
            path: '', component: MedicalStaffDetailsComponent}]},
    { path: 'add-medical', component: TopBarComponent, canActivate: [AdminGuard], children: [{
      path: '', component: AddMedicalStaffComponent}]  },
    { path: 'edit-admin', component: TopBarComponent, canActivate: [AdminGuard], children: [{
      path: '', component: EditAdminComponent}]  },
    { path: '**', redirectTo: 'login'},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
