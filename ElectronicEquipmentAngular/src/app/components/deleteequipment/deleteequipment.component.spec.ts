import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteequipmentComponent } from './deleteequipment.component';

describe('DeleteequipmentComponent', () => {
  let component: DeleteequipmentComponent;
  let fixture: ComponentFixture<DeleteequipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteequipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
