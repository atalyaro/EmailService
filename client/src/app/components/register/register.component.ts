import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import jwt_decode from "jwt-decode";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(public _fb: FormBuilder, public _server: ServerService, public _user: UserService,
    public _r: Router) { }

  public myForm: FormGroup

  ngOnInit(): void {
    this.myForm = this._fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]],
      isAdmin: false
    })
  }

  public handlesubmit() {
    this._server.register(this.myForm.value).subscribe(
      (res: any) => {
        this._r.navigateByUrl("/login")
        this._user.openSnackbar("register sucessfully")
      }, err => {
        this._user.openSnackbar(err.error)
      }
    )
  }

}
