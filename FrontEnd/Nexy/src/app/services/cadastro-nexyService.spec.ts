import { TestBed } from '@angular/core/testing';

import { CadastroNexy } from './cadastro-nexyService';

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
