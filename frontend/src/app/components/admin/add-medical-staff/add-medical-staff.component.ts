import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Medical} from '../../../interfaces/medical';

@Component({
  selector: 'app-add-medical-staff',
  templateUrl: './add-medical-staff.component.html',
  styleUrls: ['./add-medical-staff.component.css']
})
export class AddMedicalStaffComponent implements OnInit {

  medical: Medical;
  added = false;
  constructor(private adminService: AdminService, private snaackBar: MatSnackBar) {
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
        },
        error => {
          this.openSnackBar(error.error.message, 'Close');
          console.log(error);
        }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

  clearMedicalData(){
    this.added = false;
    this.medical = {
      _id: '-1',
      patientId: '',
      gender: -1,
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      birthDate: '',
      birthPlace: '',
      phoneNumber: '',
      email: '',
      visits: [],
      predictions: []
    };
  }

}
