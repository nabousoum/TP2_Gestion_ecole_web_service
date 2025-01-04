import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfesseurComponent } from './form-professeur.component';

describe('FormProfesseurComponent', () => {
  let component: FormProfesseurComponent;
  let fixture: ComponentFixture<FormProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProfesseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
