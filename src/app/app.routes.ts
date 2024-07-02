import { Routes } from '@angular/router';
import { AllRoomsComponent } from './pages/all-rooms/all-rooms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FacilitiesComponent } from './pages/facilities/facilities.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ViewRoomComponent } from './pages/view-room/view-room.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'rooms', component: RoomsComponent},
    {path: 'rooms/all', component: AllRoomsComponent},
    {path: 'rooms/:id', component: ViewRoomComponent},
    {path: 'rooms/:id/checkout', component: CheckoutComponent},
    {path: 'facilities', component: FacilitiesComponent},
    {path: 'contact-us', component: ContactComponent},
];
