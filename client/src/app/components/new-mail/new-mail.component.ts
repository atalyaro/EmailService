import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {

  constructor(public _mail: MailService, public _fb: FormBuilder, public _r: Router) { }

  public myForm: FormGroup

  ngOnInit(): void {
    this.myForm = this._fb.group({
      to: ["", Validators.required],
      title: ["", Validators.required],
      body: ""
    })
  }

  handlesubmit() {
    this._mail.newmail(this.myForm.value).subscribe(
      res => {
        console.log(res)
        this._r.navigateByUrl('/main/sent')
      },
      err => console.log(err)
    )
  }
}
