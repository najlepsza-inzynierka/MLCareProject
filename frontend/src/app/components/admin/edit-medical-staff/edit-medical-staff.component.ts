import { Component, OnInit } from '@angular/core';
import {Medical} from '../../../interfaces/medical';
import {AdminService} from '../../../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-medical-staff',
  templateUrl: './edit-medical-staff.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', '../../patient/add-patient/add-patient.component.css', './edit-medical-staff.component.css']
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
    this.adminService.getMedical(this.id).subscribe(med => {
      this.medical = med.user;
    });
  }

  saveMedical(){
    this.adminService.updateMedical(this.medical, this.id).subscribe(
        response => {
          this.openSnackBar('User edited successfully', 'Close');
          this.goBack();
        },
        error => {
          this.openSnackBar(error.error.message, 'Close');
        }
    );
  }

  confirmDialog(): void {
    const message = `Are you sure you want to delete user?`;

    const dialogData = new ConfirmDialogModel('Confirm Delete', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult){
        this.adminService.deleteMedical(this.medical._id).subscribe(response => {
              this.openSnackBar('User deleted successfully', 'Close');
              this.router.navigateByUrl(`admin-panel`);
            },
            error => {
              this.openSnackBar(error.error.message, 'Close');
            }
        );
      }
    });
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
