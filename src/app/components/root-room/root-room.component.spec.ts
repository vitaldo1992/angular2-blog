import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRoomComponent } from './root-room.component';

describe('RootRoomComponent', () => {
  let component: RootRoomComponent;
  let fixture: ComponentFixture<RootRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
