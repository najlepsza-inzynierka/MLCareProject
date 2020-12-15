import { Component, OnInit } from '@angular/core';
import {VisitService} from '../../../services/visit.service';
import {Visit} from '../../../interfaces/visit';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', '../../patient/add-patient/add-patient.component.css', './edit-visit.component.css']
})
export class EditVisitComponent implements OnInit {
  visit: Visit;
  hidden = true;

  constructor(private visitService: VisitService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public dialog: MatDialog,
              private snaackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('visitId');
    this.visitService.getVisit(id).subscribe(v => this.visit = v);
  }

  goBack(){
    this.location.back();
  }

  confirmDeleteVisitDialog(): void {
    const message = `Are you sure you want to delete visit?`;

    const dialogData = new ConfirmDialogModel('Confirm Delete', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult){
        const id = this.route.snapshot.paramMap.get('id');
        this.visitService.deleteVisit(this.visit._id).subscribe(result => {
          this.openSnackBar('Visit deleted successfully', 'Close');
          this.router.navigateByUrl(`patient/${id}`);
            },
            err => console.error(err));
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

}
