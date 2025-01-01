import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BakeryMenuComponent } from './components/bakery-menu/bakery-menu.component';
import { FaqComponent } from './components/faq/faq.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { OrderRequestsComponent } from './components/order-requests/order-requests.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { AppComponent } from './app.component';
import { LandingPortalComponent } from './components/landing-portal/landing-portal.component';

const routes: Routes = [
  { path: '', component: LandingPortalComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'menu', component: BakeryMenuComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'order-here', component: OrderRequestsComponent },
  { path: 'policies', component: PoliciesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableViewTransitions: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }