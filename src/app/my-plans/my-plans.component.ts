import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {

  userId;
  token;
  plans;
  constructor(private userSrv: UserService,
              private dataSrv: DataService) {

    this.userId = this.userSrv.user().id;
    this.token = this.userSrv.user().token;


    this.dataSrv.myPlans(this.userId, this.token).subscribe(response => {

      console.log(response);
        if(response) this.plans = response;
        else this.plans = [];
        console.log(this.plans);
    })
  }
    amountOfDays(from, to){
        let oneDay = 24*60*60*1000;
        let firstDate = new Date(from);
        let secondDate = new Date(to);
        let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
    }

  ngOnInit() {
  }

}
