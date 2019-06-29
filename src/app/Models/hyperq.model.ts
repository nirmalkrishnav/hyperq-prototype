import { Router } from '@angular/router';

export class Hyperq {

    // protected set name(name) {
    //     this.displayName = name;
    // }

    // protected get name(): string {
    //     return this.displayName;
    // }


    public static get Instance(): Hyperq {
        if (Hyperq._instance === null) {
            Hyperq._instance = new Hyperq();
        }
        return Hyperq._instance;
    }
    private static _instance: Hyperq = null;
    displayName: string;
    uid: string;
    photoURL: string;
    email: string;

    doctorID: string;
    favourites: string[];

    currentDoctor: any;
    checkedInDoctor: any;


    checkedIn = false;
    checkedInDocID: string;
    checkedInDocName: string;
    docrefID: string;


    constructor() { }
}
