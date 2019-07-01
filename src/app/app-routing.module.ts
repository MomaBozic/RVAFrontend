import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NacionalnostComponent } from './components/nacionalnost/nacionalnost.component';
import { LigaComponent } from './components/liga/liga.component';
import { TimComponent } from './components/tim/tim.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HelpComponent } from './components/core/help/help.component';
import { HomeComponent } from './components/core/home/home.component';

const routes: Routes = [
  {path:'nacionalnost', component: NacionalnostComponent},
  {path:'liga', component: LigaComponent},
  {path:'tim', component: TimComponent},

  { path: 'author', component: AuthorComponent },
  { path: 'help', component: HelpComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }