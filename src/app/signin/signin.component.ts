import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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
        alert(3);
        this.dataSrV.signIn( this.form.controls['email'].value,this.form.controls['password'].value).subscribe(value => {

            if(value['error']){
                this.error = value['error'];
            } else {
                this.error = '';
                this.userSrv.login(value['token'],value['id']);
                this.router.navigate(['./']);
            }
        })
    }

  ngOnInit() {
  }

}
