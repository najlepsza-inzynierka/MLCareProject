import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { PatientDetailsComponent } from './components/patient/patient-details/patient-details.component';
import { PatientsComponent } from './components/patient/patients/patients.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { VisitDetailsComponent } from './components/visit/visit-details/visit-details.component';
import { PickDiseaseDialogComponent } from './components/prediction/pick-disease-dialog/pick-disease-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AddVisitComponent } from './components/visit/add-visit/add-visit.component';
import { PredictionDetailsComponent } from './components/prediction/prediction-details/prediction-details.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditPatientComponent } from './components/patient/edit-patient/edit-patient.component';
import { EditVisitComponent } from './components/visit/edit-visit/edit-visit.component';
import { AddExamComponent } from './components/visit/add-exam/add-exam.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { AuthComponent } from './components/authentication/auth/auth.component';
import { AdminComponent } from './components/authentication/admin/admin.component';
import { AdminLoginScreenComponent } from './components/admin/admin-login-screen/admin-login-screen.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AddMedicalStaffComponent } from './components/admin/add-medical-staff/add-medical-staff.component';
import { MedicalStaffListComponent } from './components/admin/medical-staff-list/medical-staff-list.component';
import { EditAdminComponent } from './components/admin/edit-admin/edit-admin.component';
import {AuthInterceptor} from './auth.interceptor';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavAdminComponent } from './components/admin/side-nav-admin/side-nav-admin.component';
import { MedicalStaffDetailsComponent } from './components/admin/medical-staff-details/medical-staff-details.component';
import { AddPredictionComponent } from './components/prediction/add-prediction/add-prediction.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientDetailsComponent,
    PatientsComponent,
    AddPatientComponent,
    VisitDetailsComponent,
    PickDiseaseDialogComponent,
    AddVisitComponent,
    PredictionDetailsComponent,
    ConfirmDialogComponent,
    EditPatientComponent,
    EditVisitComponent,
    AddExamComponent,
    LoginScreenComponent,
    AuthComponent,
    AdminComponent,
    AdminLoginScreenComponent,
    AdminPanelComponent,
    AddMedicalStaffComponent,
    MedicalStaffListComponent,
    EditAdminComponent,
    SideNavComponent,
    SideNavAdminComponent,
    MedicalStaffDetailsComponent,
    AddPredictionComponent,
  ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatSliderModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        HttpClientModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule
    ],
  entryComponents: [PickDiseaseDialogComponent, ConfirmDialogComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
