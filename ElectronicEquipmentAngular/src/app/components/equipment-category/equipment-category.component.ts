import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElecteicEquipmentCategoryService } from 'src/app/services/electeic-equipment-category.service';

@Component({
  selector: 'app-equipment-category',
  templateUrl: './equipment-category.component.html',
  styleUrls: ['./equipment-category.component.css']
})
export class EquipmentCategoryComponent implements OnInit {

  constructor(private addEquipmentCategoryService: ElecteicEquipmentCategoryService, private router:Router ) { }

  ngOnInit(): void {
  }

  equipmentCategoryForm = new FormGroup({
    equipmentcategoryname: new FormControl("",[Validators.required,Validators.pattern("[A-Za-z][A-Za-z0-9]*"),Validators.minLength(2),Validators.maxLength(10)]),
  });

  equipmentCategoryAdded(){
    this.addEquipmentCategoryService.addEquipmentCategory([
      this.equipmentCategoryForm.value.equipmentcategoryname
    ]).subscribe(res=>{
      if(res=="Exist"){
        alert("Equipment Category Exist");
        window.location.reload();
      }
      else{
        alert("Equipment Category Added"); 
        window.location.reload();
      }
    })
  }

  get EquipmentCategory(): FormControl{ 
    return this.equipmentCategoryForm.get('equipmentcategoryname') as FormControl
  }
}
