import { TestBed } from '@angular/core/testing';

import { HistoricoConversaoService } from './historico-conversao.service';

describe('HistoricoConversaoService', () => {
  let service: HistoricoConversaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoConversaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
