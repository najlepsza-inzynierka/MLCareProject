import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Medical} from '../../../interfaces/medical';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-medical-staff',
  templateUrl: './add-medical-staff.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', '../../patient/add-patient/add-patient.component.css', './add-medical-staff.component.css']
})
export class AddMedicalStaffComponent implements OnInit {
  medical: Medical;
  added = false;
  hidden = true;

  constructor(private adminService: AdminService,
              private router: Router,
              private location: Location,
              private snaackBar: MatSnackBar) {
    this.clearMedicalData();
  }

  ngOnInit(): void {
  }

  saveMedical(){
    this.added = false;
    this.adminService.createMedical(this.medical).subscribe(
        response => {
          console.log(response);
          this.added = true;
          this.clearMedicalData();
          this.openSnackBar('Medical staff added successfully', 'Close');
          this.router.navigateByUrl('admin-panel');
        },
        error => {
          if (error.status === 450){
            const snackBarRef = this.openSnackBar('This person is registered in another institution.', 'Create new anyway');
            snackBarRef.onAction().subscribe(() => this.adminService.createMedicalForce(this.medical).subscribe());
            return of(error);
          }
          this.openSnackBar(error.error.message, 'Close');
          console.log(error);
        }
    );
  }

  openSnackBar(message: string, action: string) {
    return this.snaackBar.open(message, action);
  }

  clearMedicalData(){
    this.added = false;
    this.medical = {
      _id: '',
      userId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      title: '',
      address: '',
      phoneNumber: '',
      email: '',
      password: '',
    };
  }

  goBack(){
    this.location.back();
  }

}
