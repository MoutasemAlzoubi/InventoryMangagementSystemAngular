import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseItemListComponent } from './ware-house-item-list.component';

describe('WareHouseItemListComponent', () => {
  let component: WareHouseItemListComponent;
  let fixture: ComponentFixture<WareHouseItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WareHouseItemListComponent]
    });
    fixture = TestBed.createComponent(WareHouseItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
