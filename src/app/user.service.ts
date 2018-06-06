import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    loggedIn = false;
  constructor() {
      this.refreshState();

  }
  refreshState(){
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');

      if(token && id){
          this.loggedIn = true
          return true;
      } else {
          this.loggedIn = false;
          return false;
      }
  }



  login(token: string, id: string) {
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      this.refreshState();
  }

  user(){
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');

      return {token: token, id: id}
  }

  logoOut() {
      localStorage.clear();
      this.refreshState();
  }



}
