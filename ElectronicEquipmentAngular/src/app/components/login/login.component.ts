import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAddService } from 'src/app/services/user-add.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginUserService: UserAddService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl("",Validators.required),
    password: new FormControl("",[Validators.required,Validators.minLength(8)])
  });
  get Username(): FormControl{ 
    return this.loginForm.get('username') as FormControl
  }
  get Password(): FormControl{
    return this.loginForm.get('password') as FormControl
  }
  userLogin(){
    this.loginUserService.loginUser([
      this.loginForm.value.username,
      this.loginForm.value.password,
    ]).subscribe(res=>{
      if(res=='Failure')
      {
        alert("Please Enter Valid Credential");
        window.location.reload();
      }
      else if(res=='NotActive'){
        alert("User is not active");
        window.location.reload();
      }
      else{
        this.loginUserService.setToken(res);
        this.router.navigateByUrl('equipment')
      }
    });
  }
}
