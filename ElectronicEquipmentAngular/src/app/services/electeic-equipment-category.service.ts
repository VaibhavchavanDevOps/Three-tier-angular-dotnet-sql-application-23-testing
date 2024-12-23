import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElecteicEquipmentCategoryService {

  constructor(private http: HttpClient) { }
  baseServerUrl = environment.baseServerUrl+"/api/EquipmentCategory/";

  addEquipmentCategory(equipmentcategory:any){
    
    return this.http.post(this.baseServerUrl+'addEquipmentCategory',{
      EquipmentCategoryName: equipmentcategory[0]
    },{responseType:'text'});
  }
  updateEquipmentCategory(equipmentcategory:any){
    return this.http.post(this.baseServerUrl+'updateEquipmentCategory',{
      EquipmentCategoryId: equipmentcategory[0],
      EquipmentCategoryName: equipmentcategory[1]
    },{responseType:'text'});
  }
}
