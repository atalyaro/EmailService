import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(public http: HttpClient) { }

  public inbox() {
    return this.http.get('http://localhost:1001/inbox', {
      headers: { 'Authorization': localStorage.at }
    })
  }

  public sent() {
    return this.http.get('http://localhost:1001/sent', {
      headers: { 'Authorization': localStorage.at }
    })
  }

  public newmail(body) {
    return this.http.post('http://localhost:1001/newmail', body, {
      headers: {
        'Authorization': localStorage.at,
        'Content-Type': 'application/json'
      }
    })
  }

}
