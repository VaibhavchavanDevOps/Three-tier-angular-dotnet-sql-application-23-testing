import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElecteicEquipmentService } from 'src/app/services/electeic-equipment.service';
import { UserAddService } from 'src/app/services/user-add.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  constructor(private addEquipmentService: ElecteicEquipmentService, private userAddService: UserAddService, private router: Router) { }
  equipmentCategoryList:any;
  equipmentGroupList: any;
  ngOnInit() {
    this.addEquipmentService.getAllEquipmentCategory().subscribe(equipmentCategoryList=>
      {this.equipmentCategoryList = equipmentCategoryList
    });
  }
  equipmentForm = new FormGroup({
    equipmentname: new FormControl("",[Validators.required,Validators.pattern("[A-Za-z0-9]*"),Validators.minLength(2),Validators.maxLength(10)]),
    partid: new FormControl("",[Validators.required,Validators.pattern("[A-Za-z0-9]*"),Validators.maxLength(5)]),
    equipmentgroupid: new FormControl("",Validators.required),
    equipmentcategoryid: new FormControl("",Validators.required)
  });
  equipmentAdded(){
    this.addEquipmentService.addEquipment([
      this.equipmentForm.value.equipmentname,
      this.equipmentForm.value.partid,
      this.equipmentForm.value.equipmentgroupid,
      this.equipmentForm.value.equipmentcategoryid
    ]).subscribe(res=>{
      if(res=="EquipmentExist"){
        alert("Equipment Already Exist");
      }
      else{
        alert("Equipment Added Successfully");
        window.location.reload();
      }
    })
  }
  GetEquipGroupById(event:any){
     console.log(event);
     this.addEquipmentService.getEquipmentGroupByCategoryId(event).subscribe(equipmentGroupList=>{
      this.equipmentGroupList=equipmentGroupList;
     })
  }
  logOut()
  {
    this.userAddService.removeToken();
    this.router.navigateByUrl('login');
  }

  get equipmentName(): FormControl{ 
    return this.equipmentForm.get('equipmentname') as FormControl
  }
  get PartId(): FormControl{ 
    return this.equipmentForm.get('partid') as FormControl
  }
}
