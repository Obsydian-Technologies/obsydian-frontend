import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Auth from '@aws-amplify/auth';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from './auth.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _router: Router, public dialog: MatDialog ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser().then(() => { return true; })
      .catch(() => {
        this._router.navigate(['/auth/sign-in']);
        return false;
      });
  }
}
