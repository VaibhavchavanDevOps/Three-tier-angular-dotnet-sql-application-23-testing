import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAddService } from './user-add.service';

@Injectable({
  providedIn: 'root'
})
export class UserguardGuard implements CanActivate {
  constructor(private addUserService: UserAddService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.addUserService.isLoggedin();
  }
}
