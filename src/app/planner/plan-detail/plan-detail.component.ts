import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../user.service";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {

  sub;
 description;
  constructor(private dataSrv: DataService,
              private router: ActivatedRoute,
              private userSrv: UserService) {
      
    console.log(this.router.params);

  }
    amountOfDays(from, to){
        let oneDay = 24*60*60*1000;
        let firstDate = new Date(from);
        let secondDate = new Date(to);
        let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
    }

  ngOnInit() {

      this.sub = this.router.params.subscribe(params => {
           let id =  + params['id']; // (+) converts string 'id' to a number

          const token = this.userSrv.user().token;
          this.dataSrv.likePost(token, id).subscribe(value => {
          })
          this.dataSrv.getPlan(token,id).subscribe(value => {

              this.description = value[0];

          })
      });
  }

  parse(value){
    if(value)
    return JSON.parse(value);
  }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
