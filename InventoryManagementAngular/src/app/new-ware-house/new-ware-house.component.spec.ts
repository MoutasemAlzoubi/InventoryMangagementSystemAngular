import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWareHouseComponent } from './new-ware-house.component';

describe('NewWareHouseComponent', () => {
  let component: NewWareHouseComponent;
  let fixture: ComponentFixture<NewWareHouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWareHouseComponent]
    });
    fixture = TestBed.createComponent(NewWareHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
