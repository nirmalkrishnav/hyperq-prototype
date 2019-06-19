import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DetailsPage } from '../details/details.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/api/service.service';
import { AuthenticationService } from 'src/auth/authentication.service';
import { Hyperq } from '../Models/hyperq.model';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})

export class CheckinPage extends Hyperq implements OnInit {
  model = Hyperq.Instance;
  @Input() value: number;
  @ViewChild('content') private content: any;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  usersList: any;
  constructor(
    activatedRoute: ActivatedRoute,
    private service: ServiceService,
    autherservice: AuthenticationService,
    router: Router,
    public modalCtrl: ModalController) {
    super();
    this.getCheckedinUsers();
  }


  ngOnInit() {

  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  scrollToBottom() {
    this.content.scrollToBottom(300);
  }

  loadPage() {
    console.log(this.model.displayName);
    // this.scrollToBottom();
  }

  ionViewWillEnter() {
    this.loadPage();
  }
  getCheckedinUsers() {
    this.service.getCheckedInUsers(this.model.doctorID).subscribe(data => {
      this.usersList = data;
    });
  }

  confirmCheckin() {
    const m = {
      userid: this.model.uid,
      displayName: this.model.displayName,
      dataTime: new Date()
    };

    this.service.checkInUser(this.model.doctorID, m);
  }
}
