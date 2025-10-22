import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gerenciamento } from './gerenciamento';

describe('Gerenciamento', () => {
  let component: Gerenciamento;
  let fixture: ComponentFixture<Gerenciamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gerenciamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gerenciamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
