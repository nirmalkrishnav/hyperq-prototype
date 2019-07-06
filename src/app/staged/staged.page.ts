import { Component, OnInit } from '@angular/core';
import { Hyperq } from '../Models/hyperq.model';
import { ServiceService } from 'src/api/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staged',
  templateUrl: './staged.page.html',
  styleUrls: ['./staged.page.scss'],
})
export class StagedPage implements OnInit {
  model = Hyperq.Instance;
  usersList: any;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
  }

  getCheckedinUsers() {
    this.service.getCheckedInUsers(this.model.checkedInDocID).subscribe(data => {
      this.usersList = data;
    });

  }

  ionViewWillEnter() {
    console.log(this.model.checkedInDocID);
    // this.router.navigate(['public']);
    // } else {
    this.getCheckedinUsers();
    // }
  }

  checkout() {
    this.service.checkoutUser(this.model.uid).finally(() => {
      this.service.deleteCheckedinUsersFromDoctors(this.model.checkedInDocID, this.model.uid, this.model.docrefID);
      this.model.checkedIn = false;
      this.router.navigate(['public']);
    });

  }
}
