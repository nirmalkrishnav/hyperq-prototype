import { Component } from '@angular/core';
import { ServiceService } from './../../api/service.service';
import { Favourites, Doctor } from '../Models/Favourites.model';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


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

  skeletonLoading: boolean;
  constructor(
    private service: ServiceService,
    public loadingController: LoadingController,
    private router: Router) {
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
      this.skeletonLoading = false;
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
}
