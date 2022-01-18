import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public _server: ServerService, public _user: UserService) { }

  ngOnInit(): void {
    this._server.secret().subscribe(
      res => { console.log(res) },
      err => { console.log(err) }
    )
  }

}
