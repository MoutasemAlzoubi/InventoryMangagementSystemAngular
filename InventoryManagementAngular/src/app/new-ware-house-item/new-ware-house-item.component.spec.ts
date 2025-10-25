import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWareHouseItemComponent } from './new-ware-house-item.component';

describe('NewWareHouseItemComponent', () => {
  let component: NewWareHouseItemComponent;
  let fixture: ComponentFixture<NewWareHouseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWareHouseItemComponent]
    });
    fixture = TestBed.createComponent(NewWareHouseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
