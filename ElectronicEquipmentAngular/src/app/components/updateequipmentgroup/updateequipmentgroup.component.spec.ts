import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateequipmentgroupComponent } from './updateequipmentgroup.component';

describe('UpdateequipmentgroupComponent', () => {
  let component: UpdateequipmentgroupComponent;
  let fixture: ComponentFixture<UpdateequipmentgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateequipmentgroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateequipmentgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
