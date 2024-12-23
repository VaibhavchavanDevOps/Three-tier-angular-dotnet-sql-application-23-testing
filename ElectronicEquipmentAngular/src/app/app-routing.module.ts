import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteequipmentComponent } from './components/deleteequipment/deleteequipment.component';
import { EquipmentCategoryComponent } from './components/equipment-category/equipment-category.component';
import { EquipmentGroupComponent } from './components/equipment-group/equipment-group.component';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UpdateequipmentComponent } from './components/updateequipment/updateequipment.component';
import { UpdateequipmentgroupComponent } from './components/updateequipmentgroup/updateequipmentgroup.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { UserComponent } from './components/user/user.component';
import { UserguardGuard } from './services/userguard.guard';

const routes: Routes = [
  {path:'',
  component: LoginComponent
 },
 {
  path:'login',
  component: LoginComponent
 },
 {path:'user',
  component: UserComponent
 },
 {path:'updateuser',
  component: UpdateuserComponent,
 },
 {path:'equipmentcategory',
  component: EquipmentCategoryComponent
 },
 {path:'equipmentgroup',
  component: EquipmentGroupComponent
 },
 
 {path:'updateequipmentgroup',
  component: UpdateequipmentgroupComponent
 },
 {path:'equipment',
  component: EquipmentsComponent,
  canActivate:[UserguardGuard]
 },
 {path:'deleteequipment',
  component: DeleteequipmentComponent
 },
 {path:'updateequipment',
  component: UpdateequipmentComponent,
  canActivate:[UserguardGuard]
 },
 {
  path:'**',
  component: PageNotFoundComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
