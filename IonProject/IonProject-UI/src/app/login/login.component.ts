import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    'username': [''],
    'password': ['']
  });
  usernameVal = '';
  passwordVal = '';
  submitButtonAction = 'Submit';
  errorMessage: string;
  errorResponse = false;
  usernameErrorResponse = false;
  passwordErrorResponse = false;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.http.changeLoginStatus('Not Logged In');
  }
  isSubmitDisabled() {
    if (this.usernameErrorResponse === false && this.passwordErrorResponse === false
      && this.loginForm.get('username').value !== ''
      && this.loginForm.get('password').value !== '') {
      return false;
    } else {
      return true;
    }
  }

  validateValue(value, inputType) {
    const enteredVal = value;
    if (inputType === 'username') {
      this.usernameErrorResponse = false;
    } else if (inputType === 'password') {
      this.passwordErrorResponse = false;
    }
    for (var i = 0; i < enteredVal.length; i++) {
      if (enteredVal[i] === "/" || enteredVal[i] === "." || enteredVal[i] === "\\" || enteredVal[i] === ","
        || enteredVal[i] === "," || enteredVal[i] === "^") {
        if (inputType === 'username') {
          this.usernameErrorResponse = true;
        } else if (inputType === 'password') {
          this.passwordErrorResponse = true;
        }
        this.errorMessage = "Invalid Text: ('/', '\\', ',', '.', '^') not allowed";
      }
    }
  }

  onCancel() {
    this.router.navigate(['/welcomePage'], { skipLocationChange: true })
  }
  onSubmitForm() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.http.changeLoginStatus('Logging In');
    this.submitButtonAction = 'Logging In';
    this.http.authenticateUser(username, password).subscribe((response) => {
      if (response.status === true) {
        this.router.navigate(['/welcomePage/privateView'], { skipLocationChange: true });
      }
    },
      (err) => {
        this.http.changeLoginStatus('Not Logged In');
        this.submitButtonAction = 'Submit';
        if (err.error.status === false) {
          this.usernameErrorResponse = true;
          this.errorMessage = err.error.errorMessage;
        } else {
          this.usernameErrorResponse = true;
          this.passwordErrorResponse = true;
          this.errorMessage = 'Error: Something Went Wrong, Try again!!!';
        }
      });
  }
}
