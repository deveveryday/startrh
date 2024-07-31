import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmeDetailComponent } from './filme-detail/filme-detail.component';
import { FilmesComponent } from './filmes/filmes.component';
import { FilmeSearchComponent } from './filme-search/filme-search.component';
import { MessagesComponent } from './messages/messages.component';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { fakeBackendProvider } from './fake-backend.interceptor';
import { RegisterComponent } from './register/register.component';
import { initSynchronousFactory } from './app.initializer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    FilmesComponent,
    FilmeDetailComponent,
    MessagesComponent,
    FilmeSearchComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initSynchronousFactory, multi: true},
      fakeBackendProvider
  ],
})
export class AppModule { }