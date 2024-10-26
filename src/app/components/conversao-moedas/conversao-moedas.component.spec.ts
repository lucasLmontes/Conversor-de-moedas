import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversaoMoedasComponent } from './conversao-moedas.component';

describe('ConversaoMoedasComponent', () => {
  let component: ConversaoMoedasComponent;
  let fixture: ComponentFixture<ConversaoMoedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversaoMoedasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversaoMoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
