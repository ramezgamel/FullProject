import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

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
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
