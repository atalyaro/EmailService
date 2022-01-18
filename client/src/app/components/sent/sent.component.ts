import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  constructor(public _mail: MailService) { }

  public emails: any = []
  ngOnInit(): void {
    this._mail.sent().subscribe(
      res => {
        console.log(res)
        this.emails = res
      },
      err => console.log(err)
    )
  }

}
