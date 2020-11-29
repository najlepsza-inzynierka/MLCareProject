import { Component, OnInit } from '@angular/core';
import {Admin} from '../../../interfaces/admin';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', '../../patient/add-patient/add-patient.component.css', './edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  admin: Admin;
  id;
  hidden = true;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location,
              private snaackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe(admin => {
      this.admin = admin.admin;
      console.log(admin);
    });
  }

  saveAdmin(){
    // @ts-ignore
    this.adminService.updateAdmin(this.admin, this.admin._id).subscribe(
        response => {
          console.log(response);
          this.openSnackBar('Your data edited successfully', 'Close');
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
