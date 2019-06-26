import { Component } from '@angular/core';
import { ServiceService } from './../../api/service.service';
import { Favourites, Doctor } from '../Models/Favourites.model';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Hyperq } from '../Models/hyperq.model';
import { query } from '@angular/core/src/render3';
import { QuerySnapshot } from '@firebase/firestore-types';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  searchedTerm: string;

  favourites: Favourites;
  doctors: any[] = [];
  hospitals: any[] = [];
  model = Hyperq.Instance;

  skeletonLoading: boolean;

  constructor(
    private service: ServiceService,
    public loadingController: LoadingController,
    private router: Router,
    public toastController: ToastController) {
    this.loadPage();
  }

  loadPage() {
    this.getAllDoctors();
    this.getAllHospitals();
  }



  async presentLoading() {
    const loading = await this.loadingController.create();
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }

  getAllDoctors() {
    this.skeletonLoading = true;
    this.service.fetchAllDoctors().subscribe((qsnapshot) => {
      this.doctors = [];
      qsnapshot.forEach(d => {
        let coll;
        coll = d.data();
        coll['ID'] = d.id;
        this.doctors.push(coll);
      });
      this.getFavs();
    });
  }

  getAllHospitals() {
    this.skeletonLoading = true;
    // this.presentLoading();
    this.service.fetchAllHospitals().subscribe((qsnapshot) => {
      qsnapshot.forEach(d => {
        let coll;
        coll = d.data();
        coll['ID'] = d.id;
        this.hospitals.push(coll);
      });
      this.skeletonLoading = false;
    });
  }


  searchTerm() {
    this.service.serachTerm(this.searchedTerm).subscribe((qsnapshot) => {
      this.doctors = [];
      qsnapshot.forEach(d => {
        console.log(d.data());
        let coll;
        coll = d.data();
        coll['ID'] = d.id;
        this.doctors.push(coll);
      });
      this.skeletonLoading = false;
    });
  }

  showDetails(doctor): void {
    // console.log(doctor);
    this.router.navigate([`/details/${doctor.ID}/${doctor.name}`]);
  }


  // saveBackDoctors() {
  //   this.db.collection('fav').doc('glaqZfcgaaVtRVapFVnR').set({
  //     doctors: ['hdJqp4S7DhcJ2ZCgWwdQ', 'iAblrjwaOllUBhBYhHTr'],
  //     hospitals: ['LS1ja2L5E1RU79BCua2g']
  //   })
  //     .then(function (docRef) {
  //       console.log('Document written with ID: ', docRef);
  //     })
  //     .catch(function (error) {
  //       console.error('Error adding document: ', error);
  //     });

  // }
  ionViewWillEnter() {
    this.loadPage();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Added to favourites',
      duration: 1000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  addToFav(doctor) {
    const m = this.model.uid;
    console.log(this.model.favourites);
    this.service.addtofav(doctor.ID, m).finally(() => {
      this.presentToast();
      doctor.heart = true;
    });
  }
  getFavs() {
    this.service.getFavs(this.model.uid).subscribe((qsnapshot) => {
      this.model.favourites = qsnapshot.data().favourites;
      let favs;
      this.doctors.forEach(doc => {
        if (this.model.favourites.includes(doc.ID)) {
          doc.heart = true;
        } else {
          doc.heart = false;
        }
      });
      favs = this.doctors.filter(d => d.heart);
      this.service.favDocs.next(favs);
      this.skeletonLoading = false;
    });
  }

}
