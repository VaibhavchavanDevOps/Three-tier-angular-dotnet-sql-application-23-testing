import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ElecteicEquipmentService } from 'src/app/services/electeic-equipment.service';

@Component({
  selector: 'app-deleteequipment',
  templateUrl: './deleteequipment.component.html',
  styleUrls: ['./deleteequipment.component.css']
})
export class DeleteequipmentComponent implements OnInit {

  constructor(private deleteEquipmentService:ElecteicEquipmentService, private router:Router) { }

  equipmentList:any;

  ngOnInit(): void {

    this.deleteEquipmentService.getAllEquipment().subscribe(equipmentList=>
      {this.equipmentList = equipmentList
    });
  }
  equipmentForm = new FormGroup({
    equipment: new FormControl(0),
  });

  getEquipmentId(event:any){
    if(confirm("Are you sure to delete?")){
      this.deleteEquipmentService.deleteEquipment(event).subscribe(res=>
        {
          if(res=="NotAvailable"){
            alert("Equipment Not Available");
          }
          else{
            alert("Deleted Successfully");
             window.location.reload();
          }
        }
    );
    }
  }

  
}
