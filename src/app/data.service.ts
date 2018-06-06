import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:7892/';
  constructor(private http: HttpClient) { }



  savePost(data){
      return this.http.post(this.url + "create-plan", data);
  }

  getPlans(token: string){
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Authorization', 'bearer ' + token);
      return  this.http.get(this.url + "all-plans");
  }
    popular(token: string){
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'bearer ' + token);
        return  this.http.get(this.url + "popular");
    }

  getPlan(token: string, id: number){
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Authorization', 'bearer ' + token);
      return  this.http.post(this.url + "plan" ,{ id:id });
  }
  signIn(login: string, password: string){
      return  this.http.post(this.url + "login" ,{ email:login, password: password });
  }

    getWeather(city : string){
        return  this.http.get(this.url + "weather/"+ city);
    }

  myPlans(id: number, token: string){
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Authorization', 'bearer ' + token);
      return this.http.get(this.url + "my-plans/" + id);
  }

  likePost(token: string, post_id: number){
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Authorization', 'bearer ' + token);
      return  this.http.post(this.url + "like" ,{ post_id:post_id });
  }

    signUp(login: string, password: string){
        return  this.http.post(this.url + "signup" ,{ email:login, password: password });
    }
}
