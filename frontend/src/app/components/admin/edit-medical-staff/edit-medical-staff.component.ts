import { Component, OnInit } from '@angular/core';
import {Medical} from '../../../interfaces/medical';
import {AdminService} from '../../../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-medical-staff',
  templateUrl: './edit-medical-staff.component.html',
  styleUrls: ['../../patient/add-patient/add-patient.component.css', './edit-medical-staff.component.css']
})
export class EditMedicalStaffComponent implements OnInit {
  medical: Medical;
  id;
  hidden = true;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public dialog: MatDialog,
              private snaackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.adminService.getMedical(this.id).subscribe(med => this.medical = med);
  }

  saveMedical(){
    this.adminService.updateMedical(this.medical, this.id).subscribe(
        response => {
          console.log(response);
          this.openSnackBar('User edited successfully', 'Close');
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



  goBack(){
    this.location.back();
  }

}
