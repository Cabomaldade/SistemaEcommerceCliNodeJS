import { LoginServiceService } from './../login-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: LoginServiceService) {}

  onSignin(){
    this.authService.signIn(this.form.value);
  }

  ngOnInit(): any {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
