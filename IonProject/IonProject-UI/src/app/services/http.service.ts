import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loginStatus = 'Not Logged In';
  private loginStatusSource = new BehaviorSubject<any>('Not Logged In');
  currentLoginStatusObservable = this.loginStatusSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }
  changeLoginStatus(status: string){
    this.loginStatusSource.next(status);
  }
  authenticateUser(username, password){
    return this.httpClient.get<any>('http://localhost:8082/' + '?username=' + username + '&password=' + password);
  }
}
