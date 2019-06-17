import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/auth/authentication.service';
import { map, subscribeOn } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ServiceService } from 'src/api/service.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  myReviews: any;

  constructor(public autherservice: AuthenticationService, public alertController: AlertController, private service: ServiceService) {
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
    this.presentAlertMultipleButtons();
  }

  ngOnInit() {
    this.service.fetchReviewsUserWrote(this.autherservice.userData.uid).subscribe(querySnapshot => {
      this.myReviews = [];
      querySnapshot.forEach(doc => {
        const r = doc.data();
        r['id'] = doc.id;
        this.myReviews.push(r);
      });
    });
  }

}
