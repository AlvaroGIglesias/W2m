import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HeroListComponent } from './views/hero-list/hero-list.component';
import { HeroComponent } from './components/hero/hero.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeroEditComponent } from './views/hero-edit/hero-edit.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ToUpperCaseDirective } from './directives/to-upper-case.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HeroListComponent,
    ConfirmDialogComponent,
    HeroEditComponent,
    ToUpperCaseDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
