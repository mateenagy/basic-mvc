import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public rForm: FormGroup;
  public loggedIn = false;
  public user: any;
  public error: string;
  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.rForm = this.fb.group({
      'username': [null, Validators.required]
    });

    const body = {
      'token': localStorage.getItem('token')
    };
    this.http.post('/api/loginToken', body, {
      responseType: 'text',
      headers: new HttpHeaders().set('Content-type', 'application/json')
    })
    .subscribe(
      response => {
        if ( JSON.parse(response) === 'not_authorized') {
          this.loggedIn = false;
        } else {
          this.user = JSON.parse(response)[0];
          this.loggedIn = true;
        }
      }
    );



   }

  ngOnInit() {
  }

  public logIn(user) {
    // SET BODY
    const body = {
        'username': user.username,
        'token': localStorage.getItem('token')
      };
      // console.log(localStorage.getItem('token'));
    // SET POST REQUEST
    this.http.post('/api/login', body, {
      responseType: 'text',
      headers: new HttpHeaders().set('Content-type', 'application/json')
    })
    // SUBSCRIBE FOR BACKEND RESPONSE
    .subscribe(
      response => {
        // HANDLE ERROR
        console.log(response);
        if (JSON.parse(response) === 'user_not_found') {
          console.log('nincs ilyen user');
        } else {
          // CHECK TOKEN
          if (JSON.parse(response) === 'has_token') {
            console.log('van token');
          } else {
            localStorage.setItem('token', JSON.parse(response).token);
            this.user = JSON.parse(response).users[0];
            this.loggedIn = true;
          }
        }
      },
      error => console.log('Error: ' + error),
      () => {
        this.rForm.reset();
      }
    );
  }

}
