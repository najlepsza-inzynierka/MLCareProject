import { Component, OnInit } from '@angular/core';
import {Admin} from '../../../interfaces/admin';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  admin: Admin;
  id;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location,
              private snaackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.adminService.getAdmin(this.id).subscribe(admin => this.admin = admin);
  }

  saveAdmin(){
    this.adminService.updateAdmin(this.admin, this.id).subscribe(
        response => {
          console.log(response);
          this.openSnackBar('Your data edited successfully', 'Close');
        },
        error => {
          this.openSnackBar('Something went wrong :(', 'Close');
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
