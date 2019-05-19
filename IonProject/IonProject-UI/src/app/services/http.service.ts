import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loginStatus: string = 'Not Logged In';
  private loginStatusSource = new BehaviorSubject<any>('Not Logged In');
  currentLoginStatusObservable = this.loginStatusSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }
  changeLoginStatus(status: string) {
    this.loginStatusSource.next(status);
  }
  authenticateUser(username: string, password: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8082/' + '?username=' + username + '&password=' + password);
  }
}
