import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


    form: FormGroup;
    error = '';
    constructor(private fb: FormBuilder,
                private dataSrV: DataService,
                private userSrv: UserService,
                private router: Router) {

        this.form = this.fb.group({
            email : ['', Validators.required],
            password :['', Validators.required]
        })


    }

    onSubmit(){

        this.dataSrV.signUp( this.form.controls['email'].value,this.form.controls['password'].value).subscribe(value => {

          if(value['success']) {
                  this.error = '';

                  this.router.navigate(['signin']);

          } else {
              this.error = value['error'];
          }


        })
    }

    ngOnInit() {
    }

}
