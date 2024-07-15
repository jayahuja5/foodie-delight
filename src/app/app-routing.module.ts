import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './Pages/restaurants/restaurants.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { SoonComponent } from './Pages/soon/soon.component';
import { ViewRestaurantComponent } from './Pages/view-restaurant/view-restaurant.component';

const titleAddOn = ' | Foodie Delight';

const routes: Routes = [
  {
    path: 'restaurants',
    title: 'Restuarants' + titleAddOn,
    component: RestaurantsComponent,
  },
  {
    path: 'restaurants/view/:id',
    component: ViewRestaurantComponent,
  },
  {
    path: 'restaurants/add',
    component: ViewRestaurantComponent,
    data: { new: true },
  },
  {
    path: 'order',
    title: 'Coming soon' + titleAddOn,
    component: SoonComponent,
  },
  {
    path: 'deliveries',
    title: 'Coming soon' + titleAddOn,
    component: SoonComponent,
  },
  {
    path: 'users',
    title: 'Coming soon' + titleAddOn,
    component: SoonComponent,
  },
  {
    path: 'settings',
    title: 'Coming soon' + titleAddOn,
    component: SoonComponent,
  },
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  {
    path: '**',
    title: 'Page not found' + titleAddOn,
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
