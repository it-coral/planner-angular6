import { Injectable } from '@angular/core';
import { CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class AuthActivateRouteGuard implements CanActivate {

    constructor(private router: Router, private userSrv: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userSrv.loggedIn) {
            return true ;
        }  else {
            this.router.navigate(['/signin']);
            return false;
        }
    }
}


@Injectable()
export class NotAuthActivateRouteGuard implements CanActivate {

    constructor(private router: Router, private userSrv: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.userSrv.loggedIn) {
            return true ;
        }  else {
            this.router.navigate(['']);
            return false;
        }
    }
}

