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

  @Input() medical: Medical;
  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private snaackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
      const id = this.route.snapshot.paramMap.get('id');
      this.adminService.getMedical(id).subscribe(medical => {
        this.medical = medical.user;
      });
  }

  goBack(): void {
    this.location.back();
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 3000,
    });
  }

}
