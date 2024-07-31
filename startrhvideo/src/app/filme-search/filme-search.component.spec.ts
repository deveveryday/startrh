import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeSearchComponent } from './filme-search.component';

describe('FilmeSearchComponent', () => {
  let component: FilmeSearchComponent;
  let fixture: ComponentFixture<FilmeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
