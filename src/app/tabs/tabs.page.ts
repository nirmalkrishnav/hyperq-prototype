import { Component } from '@angular/core';
import { Hyperq } from '../Models/hyperq.model';
import { Router } from '@angular/router';
import { ServiceService } from 'src/api/service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  model = Hyperq.Instance;
  constructor(private router: Router, private service: ServiceService) {
  }

  navigateToStage() {
    this.router.navigate(['/staged']);
  }
  loadUserData() {
    if (this.model.uid) {
      this.service.fetchUserByID(this.model.uid).subscribe(resp => {
        const user = resp.data();
        console.log(user);
        if (user.checkin) {
          this.model.checkedIn = user.checkin.status;
          this.model.checkedInDocID = user.checkin.doctorID;
          this.model.checkedInDocName = user.checkin.docName;
        } else {
          this.model.checkedIn = false;
        }
      });

    } else {
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.loadUserData();
  }
}
