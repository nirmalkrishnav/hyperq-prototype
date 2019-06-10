import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';


import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {

  constructor(public auth: AuthenticationService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      })
    );
  }

}

