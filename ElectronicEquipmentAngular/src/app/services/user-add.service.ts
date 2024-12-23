import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserAddService {

  constructor(private http: HttpClient) { }
  //baseServerUrl = "https://localhost:5001/api/User/";
  baseServerUrl=environment.baseServerUrl+"/api/User/";

  currentUser: BehaviorSubject<any> =new BehaviorSubject(null); 

  jwtHelperService=new JwtHelperService();
  addUser(user:any){
    return this.http.post(this.baseServerUrl+ "addUser",{
      UserName: user[0],
      Password: user[1],
      Active: user[2]
    },{responseType:'text'});
  }
  updateUser(user:any){
    return this.http.put(this.baseServerUrl + "updateUser",{
      UserName: user[0],
      Password: user[1],
      NewPassword:user[2],
    },{responseType:'text'});
  }
  loginUser(user:any){
    return this.http.post(this.baseServerUrl + "loginUser",{
      UserName: user[0],
      Password: user[1],
    },{responseType:'text'});
  }
  setToken(token:string){
    localStorage.setItem("access_token",token);
    this.loadCurrentUser();
  }
  loadCurrentUser(){
    const token=localStorage.getItem("access_token");
    const userInfo= token!=null? this.jwtHelperService.decodeToken(token):null;
    console.log(userInfo);
  }
  isLoggedin():boolean{
    return localStorage.getItem("access_token")?true:false;
  }
  removeToken()
  {
    localStorage.removeItem("access_token");
  }
}
