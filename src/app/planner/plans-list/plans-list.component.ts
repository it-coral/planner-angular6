import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {
  plans;
  sortedPlans;
  token;
  popular;
  constructor(private dateSrv: DataService, private router: Router, private userSrv: UserService) {    

    this.token = this.userSrv.user().token;

    this.dateSrv.getPlans(this.token).subscribe(value =>{
      
      if(value) this.plans = value;
      else this.plans = [];

      this.sortedPlans = this.plans;

    })


      this.dateSrv.popular(this.token).subscribe(value =>{
          if(value) this.popular = value;
          else this.popular  = [];
      })
  }

    amountOfDays(from, to){
        let oneDay = 24*60*60*1000;
        let firstDate = new Date(from);
        let secondDate = new Date(to);
        let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
    }


    sortPlans(event){
      let value = event.value;
      if(value.length > 0) {
          this.sortedPlans = this.plans.filter( item => {
              return item.location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
          })
      } else {
          this.sortedPlans = this.plans
      }
    }

    // seeDetail(id: number){
    //
    // this.router.navigate('plan-detail',{id: id});
    // }

  ngOnInit() {

  }

}
