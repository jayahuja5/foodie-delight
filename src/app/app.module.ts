import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { RestaurantsComponent } from './Pages/restaurants/restaurants.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { SoonComponent } from './Pages/soon/soon.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { ViewRestaurantComponent } from './Pages/view-restaurant/view-restaurant.component';
import { FormComponent } from './Components/form/form.component';
import { ToastComponent } from './Components/toast/toast.component';
import { CommonService } from './Services/common.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RestaurantsComponent,
    NotFoundComponent,
    SoonComponent,
    FeedbackComponent,
    ViewRestaurantComponent,
    FormComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
