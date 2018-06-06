import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  isLoggedIn =  false;

  constructor(private userSrv: UserService, private router:Router) {



    this.isLoggedIn = userSrv.loggedIn;


  }



    logOut(){

      this.userSrv.logoOut();
        this.router.navigate(['signin']);
    }
}
