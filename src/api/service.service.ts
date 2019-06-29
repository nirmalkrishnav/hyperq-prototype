import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Favourites, Doctor } from 'src/app/Models/Favourites.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentSnapshot, FieldValue } from '@firebase/firestore-types';
import { firestore } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  hospitalRef = 'hospitals';
  doctorRef = 'doctors';
  userRef = 'users';

  favDocs = new BehaviorSubject<any>('');

  constructor(
    private http: Http,
    private db: AngularFirestore,
  ) { }

  public fetchAllDoctors(): Observable<any> {
    return this.db.collection(this.doctorRef).get();
  }

  public fetchAllHospitals(): Observable<any> {
    return this.db.collection(this.hospitalRef).get();
  }

  public serachTerm(searchedTerm): Observable<any> {
    return this.db.collection(this.doctorRef, ref => ref.where('name', '==', searchedTerm)).get();
    // return this.db.collection(this.doctorRef, ref => ref.orderBy('name').startAt(searchedTerm)).get();
  }

  public fetchDoctorDetail(id: string): Observable<any> {
    return this.db.collection(this.doctorRef).doc(id).get();
  }

  public fetchDoctorReviews(id: string): Observable<any> {
    return this.db.collection(this.doctorRef).doc(id).collection('reviews', data => data.orderBy('date', 'desc')).get();
  }

  public fetchReviewsUserWrote(userid: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.db.collectionGroup('reviews', data => data.where('userid', '==', userid).orderBy('date', 'desc')).get();

  }

  public submitReviewForDoctor(doctorDocID: string, review: any) {
    return this.db.collection(this.doctorRef).doc(doctorDocID).collection('reviews').add(review);
  }

  public checkInUser(doctorDocID: string, m) {
    return this.db.collection(this.doctorRef).doc(doctorDocID).update({
      checkin: firestore.FieldValue.arrayUnion(m)
    });
  }

  public getCheckedInUsers(doctorDocID: string): Observable<any> {
    return this.db.collection(this.doctorRef).doc(doctorDocID).valueChanges();
    // return this.db.collection(this.doctorRef).doc(doctorDocID).get('checkin');
  }

  public addtofav(doctorDocID: string, userID: string) {
    return this.db.collection(this.userRef).doc(userID).update({
      favourites: firestore.FieldValue.arrayUnion(doctorDocID)
    });
  }

  public getFavs(userID: string) {
    return this.db.collection(this.userRef).doc(userID).get();
  }

  updateUserCheckin(userID, m) {
    return this.db.collection(this.userRef).doc(userID).update({
      checkin: m
    });
  }
}
