import { Component } from '@angular/core';
import { Hyperq } from '../Models/hyperq.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  model = Hyperq.Instance;
  constructor(private router: Router) {
    if (this.model.uid) {

    } else {
      this.router.navigate(['/login']);
    }
  }


}
