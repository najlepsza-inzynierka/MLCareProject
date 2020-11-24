import { Component, OnInit } from '@angular/core';
import {VisitService} from '../../../services/visit.service';
import {Visit} from '../../../interfaces/visit';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', './edit-visit.component.css']
})
export class EditVisitComponent implements OnInit {
  visit: Visit;
  constructor(private visitService: VisitService,
              private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog) { }

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
        this.visitService.deleteVisit(this.visit._id).subscribe(result => console.log(result),
            err => console.error(err));
      }
    });
  }

}
