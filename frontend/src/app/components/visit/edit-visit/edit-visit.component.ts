import { Component, OnInit } from '@angular/core';
import {VisitService} from '../../../services/visit.service';
import {Visit} from '../../../interfaces/visit';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.css']
})
export class EditVisitComponent implements OnInit {
  visit: Visit;
  constructor(private visitService: VisitService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('visitId');
    this.visitService.getVisit(id).subscribe(v => this.visit = v);
  }

  goBack(){
    this.location.back();
  }

}
