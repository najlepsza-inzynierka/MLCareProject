import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {AdminService} from '../../../services/admin.service';
import {Medical} from '../../../interfaces/medical';

@Component({
  selector: 'app-medical-staff-details',
  templateUrl: './medical-staff-details.component.html',
  styleUrls: ['./medical-staff-details.component.css']
})
export class MedicalStaffDetailsComponent implements OnInit {

  result = false;
  @Input() medical: Medical;
  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public dialog: MatDialog,
              private snaackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      this.adminService.getMedical(id).subscribe(medical => {
        this.medical = medical.user;
        console.log(medical);
      });
  }

  goBack(): void {
    this.location.back();
  }


  // confirmDialog(): void {
  //   const message = `Are you sure you want to delete user?`;
  //
  //   const dialogData = new ConfirmDialogModel('Confirm Delete', message);
  //
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: '400px',
  //     data: dialogData
  //   });
  //
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     this.result = dialogResult;
  //     if (dialogResult){
  //       this.adminService.deletePatient(this.patient._id).subscribe(response => {
  //             console.log(response);
  //             this.openSnackBar('User deleted successfully', 'Close');
  //             this.router.navigateByUrl(`patients`);
  //           },
  //           error => {
  //             this.openSnackBar(error.error.message, 'Close');
  //             console.log(error);
  //           }
  //       );
  //     }
  //   });
  // }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 3000,
    });
  }

}
