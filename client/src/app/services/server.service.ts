import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  login(buddy) {
    return this.http.post("http://localhost:1000/login", buddy, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  register(buddy) {
    return this.http.post("http://localhost:1000/signup", buddy, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  logout(type) {
    return this.http.get(`http://localhost:1000/logout?rt=${localStorage.rt}&type=${type}`)
  }

  secret() {
    return this.http.get(`http://localhost:1001/secret`, {
      headers: { 'Authorization': localStorage.token }
    })
  }

}
