import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElecteicEquipmentService } from 'src/app/services/electeic-equipment.service';
import { UserAddService } from 'src/app/services/user-add.service';

@Component({
  selector: 'app-updateequipment',
  templateUrl: './updateequipment.component.html',
  styleUrls: ['./updateequipment.component.css']
})
export class UpdateequipmentComponent implements OnInit {

  constructor(private updateEquipmentService: ElecteicEquipmentService,private userAddService: UserAddService,private router: Router) { }
  equipmentCategoryList:any;
  equipmentGroupList: any;

  ngOnInit(): void {
    this.updateEquipmentService.getAllEquipmentCategory().subscribe(equipmentCategoryList=>
      {this.equipmentCategoryList = equipmentCategoryList
    });
  }
  updateEquipmentForm = new FormGroup({
    equipmentname: new FormControl("",Validators.required),
    partid: new FormControl("",[Validators.required,Validators.pattern("[A-Za-z0-9]*"),Validators.maxLength(5)]),
    equipmentgroupid: new FormControl("",Validators.required),
    equipmentcategoryid: new FormControl("",Validators.required)
  });

  equipmentUpdated(){
    this.updateEquipmentService.updateEquipment([
      this.updateEquipmentForm.value.equipmentname,
      this.updateEquipmentForm.value.partid,
      this.updateEquipmentForm.value.equipmentgroupid,
      this.updateEquipmentForm.value.equipmentcategoryid
    ]).subscribe(res=>{
      if(res=="NotAvailable"){
        alert("Equipment Not Available");
        //window.location.reload();
      }
      else{
        alert("Updated Successfully");
        window.location.reload();
      }
    })
  }
  GetEquipGroupById(event:any){
    console.log(event);
    this.updateEquipmentService.getEquipmentGroupByCategoryId(event).subscribe(equipmentGroupList=>{
     this.equipmentGroupList=equipmentGroupList;
    })
  }
  logOut()
  {
    this.userAddService.removeToken();
    this.router.navigateByUrl('login');
  }
  get PartId(): FormControl{ 
    return this.updateEquipmentForm.get('partid') as FormControl
  }
}
