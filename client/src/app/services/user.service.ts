import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import UserInterface from '../interfaces/user.interface';
import jwt_decode from "jwt-decode";
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser: UserInterface = {
    isLoggedIn: false
  }
  constructor(public _sb: MatSnackBar, public _r: Router, public _server: ServerService) { }

  logout() {
    this.loggedUser = {
      isLoggedIn: false
    }
    // 
    this._server.logout("device").subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    // delete token from local storage
    localStorage.at = ""
    localStorage.rt = ""
    // redirect user to login page
    this._r.navigateByUrl('/login')
    // snackbar => notify user 
    this.openSnackbar("logout successfully")
  }

  public decode(token) {
    const decoded: any = jwt_decode(token)
    if (Date.now() / 1000 < decoded.exp) {
      this.loggedUser.id = decoded.user.id
      this.loggedUser.username = decoded.user.username
      this.loggedUser.isAdmin = decoded.user.isAdmin
      this.loggedUser.isLoggedIn = true
      // redirect to main page
      this._r.navigateByUrl("/main")
    }
  }

  public openSnackbar(msg) {
    this._sb.open(msg, "", {
      duration: 2500,
      verticalPosition: 'top'
    })
  }
}
