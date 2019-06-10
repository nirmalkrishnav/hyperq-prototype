import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/auth/authentication.service';
import { map, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private autherservice: AuthenticationService) {
  }

  logout() {
    this.autherservice.signOut();
  }

  ngOnInit() {
  }

}
