import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPanelComponent } from './notifications-panel.component';

describe('NotificationsPanelComponent', () => {
  let component: NotificationsPanelComponent;
  let fixture: ComponentFixture<NotificationsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
