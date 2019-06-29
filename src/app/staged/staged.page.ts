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

      this.usersList.checkin = this.usersList.checkin.sort((a, b) => parseFloat(a.dataTime) - parseFloat(b.dataTime));
    });

  }

  ionViewWillEnter() {
    if (this.model.checkedInDocID) {
      this.router.navigate(['public']);
    } else {
      this.getCheckedinUsers();
    }
  }

  checkout() {
    this.service.checkoutUser(this.model.uid).finally(() => {
      this.model.checkedIn = false;
      this.router.navigate(['public']);
    });
  }
}
