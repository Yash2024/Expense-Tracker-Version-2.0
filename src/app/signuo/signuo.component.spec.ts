import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuoComponent } from './signuo.component';

describe('SignuoComponent', () => {
  let component: SignuoComponent;
  let fixture: ComponentFixture<SignuoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignuoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
