import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebframeComponent } from './webframe.component';

describe('WebframeComponent', () => {
  let component: WebframeComponent;
  let fixture: ComponentFixture<WebframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
