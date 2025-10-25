import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashhBoardComponent } from './dashh-board.component';

describe('DashhBoardComponent', () => {
  let component: DashhBoardComponent;
  let fixture: ComponentFixture<DashhBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashhBoardComponent]
    });
    fixture = TestBed.createComponent(DashhBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
