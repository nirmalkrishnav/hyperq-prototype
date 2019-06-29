import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/api/service.service';
import { AuthenticationService } from 'src/auth/authentication.service';
import { finalize } from 'rxjs/operators';
import { Hyperq } from '../Models/hyperq.model';
import { ModalController } from '@ionic/angular';
import { CheckinPage } from '../checkin/checkin.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  name: string;
  id: string;
  doctorDetails: any;
  reviews: any = [];

  showReview = true;
  myReview: string;
  model = Hyperq.Instance;
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected service: ServiceService,
    protected autherservice: AuthenticationService,
    protected router: Router,
    public modalController: ModalController) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(pmap => {
      this.name = pmap.name;
      this.id = pmap.id;
      this.doctorDetails = null;
      this.reviews = [];

      this.service.fetchDoctorDetail(this.id).subscribe(data => {
        this.doctorDetails = data.data();
        this.service.fetchDoctorReviews(this.id).subscribe(rev => {

          rev.forEach(d => {
            let coll;
            coll = d.data();
            this.reviews.push(coll);
          });
        });
      });
    });
  }


  segmentChanged(ev: any) {
    // console.log('Segment changed', ev.detail.value);
    if (ev.detail.value === 'reviews') {
      this.showReview = true;
    } else {
      this.showReview = false;
    }
  }
  submitReview() {
    const review = {
      comment: this.myReview,
      date: new Date(),
      displayName: this.autherservice.userData.displayName,
      userid: this.autherservice.userData.uid,
      docName: this.doctorDetails.name
    };

    this.service.submitReviewForDoctor(this.id, review).finally(() => {
      this.reviews.unshift(review);
      this.myReview = null;
    });
  }

  navigateToCheckin() {
    this.model.doctorID = this.id;
    this.model.currentDoctor = this.doctorDetails;
    // this.router.navigate([`/checkin`]);
    this.presentModal();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: CheckinPage,
      componentProps: { value: 123 },
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      cssClass: ['customModal'],
    });
    return await modal.present();
  }
}
