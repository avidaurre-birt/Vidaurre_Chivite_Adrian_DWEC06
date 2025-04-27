import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlantacionComponent } from './form-plantacion.component';

describe('FormPlantacionComponent', () => {
  let component: FormPlantacionComponent;
  let fixture: ComponentFixture<FormPlantacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPlantacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlantacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
