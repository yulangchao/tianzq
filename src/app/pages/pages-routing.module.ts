import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'  },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
