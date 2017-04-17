import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { IDeveloper } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {
  dialogStatus = 'inactive';
  developers = [];
  developer: any = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    competence: '',
    langage: ''
  };
  constructor(private http: Http,
    private route: ActivatedRoute,
    private router: Router, private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getDevelopers()
      .subscribe((data: IDeveloper[]) => this.developers = data);
  }

  delete(developer) {
    this.dataService.deleteDeveloper(developer.id);
  }

  showDialog() {
    this.dialogStatus = 'active';
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
  }

}
