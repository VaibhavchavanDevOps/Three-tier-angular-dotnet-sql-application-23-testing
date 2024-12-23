import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateequipmentComponent } from './updateequipment.component';

describe('UpdateequipmentComponent', () => {
  let component: UpdateequipmentComponent;
  let fixture: ComponentFixture<UpdateequipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateequipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
