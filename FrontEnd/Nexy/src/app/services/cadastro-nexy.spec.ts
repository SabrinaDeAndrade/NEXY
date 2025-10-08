import { TestBed } from '@angular/core/testing';

import { CadastroNexy } from './cadastro-nexy';

describe('CadastroNexy', () => {
  let service: CadastroNexy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroNexy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
