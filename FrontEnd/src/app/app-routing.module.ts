import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/pages/articles/articles.component';
import { BookingComponent } from './components/pages/booking/booking.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SingleArticleComponent } from './components/pages/single-article/single-article.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'edit', component:EditComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'booking', component:BookingComponent},
  {path:'article', children:[
    {path:"all", component:ArticlesComponent},
    {path:"single/:articleId", component:SingleArticleComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
