import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Favourites, Doctor } from 'src/app/Models/Favourites.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentSnapshot } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  hospitalRef = 'hospitals';
  doctorRef = 'doctors';

  constructor(
    private http: Http,
    private db: AngularFirestore
  ) { }

  public fetchAllDoctors(): Observable<any> {
    return this.db.collection(this.doctorRef).get();
  }

  public fetchAllHospitals(): Observable<any> {
    return this.db.collection(this.hospitalRef).get();
  }

  public serachTerm(searchedTerm): Observable<any> {
    return this.db.collection(this.doctorRef, ref => ref.where('name', '==', searchedTerm)).get();
    //return this.db.collection(this.doctorRef, ref => ref.orderBy('name').startAt(searchedTerm)).get();
  }

  public fetchDoctorDetail(id: string): Observable<any> {
    return this.db.collection(this.doctorRef).doc(id).get();
  }

  public fetchDoctorReviews(id: string): Observable<any> {
    return this.db.collection(this.doctorRef).doc(id).collection('reviews').get();
  }

  public fetchReviewsUserWrote(userid: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.db.collectionGroup('reviews').get();

  }
}
