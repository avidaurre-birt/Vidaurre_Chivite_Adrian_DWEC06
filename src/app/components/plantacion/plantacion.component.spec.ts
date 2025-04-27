import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantacionComponent } from './plantacion.component';

describe('PlantacionComponent', () => {
  let component: PlantacionComponent;
  let fixture: ComponentFixture<PlantacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
