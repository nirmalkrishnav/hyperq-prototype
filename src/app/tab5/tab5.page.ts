import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/auth/authentication.service';
import { map, subscribeOn } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(public autherservice: AuthenticationService, public alertController: AlertController) {
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
  }

}
