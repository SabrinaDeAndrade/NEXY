import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTest } from './admin-test';

describe('AdminTest', () => {
  let component: AdminTest;
  let fixture: ComponentFixture<AdminTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
