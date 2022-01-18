import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(public _mail: MailService) { }

  public emails: any = []
  ngOnInit(): void {
    this._mail.inbox().subscribe(
      res => {
        console.log(res)
        this.emails = res
      },
      err => console.log(err)
    )
  }

}
