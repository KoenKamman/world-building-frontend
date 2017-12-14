import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureItemComponent } from './adventure-item.component';

describe('AdventureItemComponent', () => {
  let component: AdventureItemComponent;
  let fixture: ComponentFixture<AdventureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
