import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/pages/articles/articles.component';
import { BookingComponent } from './components/pages/booking/booking.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SingleArticleComponent } from './components/pages/single-article/single-article.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent, canActivate:[LoginGuard]},
  {path:'edit', component:EditComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'booking', component:BookingComponent, canActivate:[AuthGuard]},
  {path:'article', children:[
    {path:"all", component:ArticlesComponent, canActivate:[AuthGuard]},
    {path:"single/:articleId", component:SingleArticleComponent, canActivate:[AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
