import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../../_services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted=false;
  error='';

  @ViewChild('f') loginForm: NgForm

  constructor(private authService: AuthenticateService, private router:Router) { }

  ngOnInit() {
  }

  signIn(form: NgForm) {
    if(!form.invalid) {
      const value = form.value;
      this.authService.authenticate(value.email, value.password)
      .subscribe(
          data => {   
            this.router.navigate(['/home']);
          },
          error => {
            this.error = error;
          }
      );
    }
  } 

}
