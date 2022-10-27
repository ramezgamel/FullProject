import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ArticlesComponent } from './components/pages/articles/articles.component';
import { SingleArticleComponent } from './components/pages/single-article/single-article.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/LoadingSpinner.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { BookingComponent } from './components/pages/booking/booking.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { AuthInterceptor } from './auth.interceptor';
import { EditComponent } from './components/pages/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    SidebarComponent,
    ArticlesComponent,
    SingleArticleComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    BookingComponent,
    Error404Component,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
