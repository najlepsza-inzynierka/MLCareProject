import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorNavigationComponent } from './components/doctor-navigation/doctor-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { PatientDetailsComponent } from './components/patient/patient-details/patient-details.component';
import { PatientsComponent } from './components/patient/patients/patients.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
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

@NgModule({
  declarations: [
    AppComponent,
    DoctorNavigationComponent,
    PatientDetailsComponent,
    PatientsComponent,
    AddPatientComponent,
    VisitDetailsComponent,
    PickDiseaseDialogComponent,
    AddVisitComponent,
    PredictionDetailsComponent,
    ConfirmDialogComponent,
    EditPatientComponent,
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
        // HttpClientInMemoryWebApiModule.forRoot(
        //     InMemoryDataService, {dataEncapsulation: false}
        // ),
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  entryComponents: [PickDiseaseDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
