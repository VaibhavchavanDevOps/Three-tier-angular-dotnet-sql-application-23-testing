import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAddService } from 'src/app/services/user-add.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private addUserService: UserAddService, private router: Router) { }
  confirmPassword: string ='none';

  ngOnInit(): void {
  }

  
  

  userForm = new FormGroup({
    username: new FormControl("",[Validators.required, Validators.pattern(/^([A-z])*[^\s]\1*$/),Validators.minLength(2),Validators.maxLength(8)]),
    password: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,15}$/)]),
    confirmpassword: new FormControl(""),
    active: new FormControl("",Validators.required)
  });

  get Username(): FormControl{ 
    return this.userForm.get('username') as FormControl
  }
  get Password(): FormControl{
    return this.userForm.get('password') as FormControl
  }
  get ConfirmPassword():FormControl{
    return this.userForm.get('confirmpassword') as FormControl
  }
  
  userAdded(){
      if(this.Password.value==this.ConfirmPassword.value){
        this.addUserService.addUser([
          this.userForm.value.username,
          this.userForm.value.password,
          this.userForm.value.active
        ]).subscribe(res=>{
          if(res=='Exist')
          {
            alert("User already exist")
          }
          else{
            console.log(res);
            this.addUserService.setToken(res);
            this.router.navigateByUrl('equipment')
          }
        });
      }
      else{
        this.confirmPassword='inline'
      }
    }
}
