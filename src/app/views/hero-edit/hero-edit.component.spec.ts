import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroService } from 'src/app/services/hero.service';

import { HeroEditComponent } from './hero-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('HeroEditComponent', () => {
  let component: HeroEditComponent;
  let fixture: ComponentFixture<HeroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroEditComponent ],
      providers: [
        HeroService
      ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
