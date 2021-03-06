import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/auth/authentication.service';
import { map, subscribeOn } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ServiceService } from 'src/api/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  myReviews: any;
  favDocs: any;
  constructor(
    public autherservice: AuthenticationService,
    public alertController: AlertController,
    private service: ServiceService,
    private router: Router) {
    this.service.favDocs.subscribe(data => {
      this.favDocs = data;
    });
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      subHeader: '',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            this.autherservice.signOut();
          }
        }
      ]
    });
    await alert.present();
  }

  logout() {
    // this.presentAlertMultipleButtons();
    this.autherservice.signOut();
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.service.fetchReviewsUserWrote(this.autherservice.userData.uid).subscribe(querySnapshot => {
      this.myReviews = [];
      querySnapshot.forEach(doc => {
        const r = doc.data();
        r['id'] = doc.id;
        this.myReviews.push(r);
      });
    });
  }

  ionViewWillEnter() {
    this.loadPage();
  }

  navToDetail(doc) {
    this.router.navigate([`/details/${doc.ID}/${doc.name}`]);

  }

}
