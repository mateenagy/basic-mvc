import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  public user: any;
  public loggedIn = false;
  constructor(private http: HttpClient) {}

  public tokenLogin() {
    return new Promise((resolve, reject) => {
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
            resolve(this.user);
          }
        }
      );
    });
  }

  public login(user, form) {
    return new Promise((resolve, reject) => {
      // SET BODY
      const body = {
        'username': user.username,
        'token': localStorage.getItem('token'),
        'password': user.password
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
          console.log(JSON.parse(response));
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
          form.reset();
        }
      );
    });
  }

  public register(user, form) {
    return new Promise((resolve, reject) => {
      const body = {
        'username': user.username,
        'email': user.email,
        'full_name': user.full_name,
        'password': user.password
      };
      this.http.post('/api/addUser', body, {
        responseType: 'text',
        headers: new HttpHeaders().set('Content-type', 'application/json')
      })
      .subscribe(
        res => {},
        error => console.log('Error: ' + error),
        () => {
          form.reset();
        }
      );
    });
  }

}
