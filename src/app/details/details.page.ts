import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/api/service.service';

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
  constructor(private activatedRoute: ActivatedRoute, private service: ServiceService) { }

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



}
