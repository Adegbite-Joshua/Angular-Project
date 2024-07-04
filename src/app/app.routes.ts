import { Routes } from '@angular/router';
import { AllRoomsComponent } from './pages/all-rooms/all-rooms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FacilitiesComponent } from './pages/facilities/facilities.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ViewRoomComponent } from './pages/view-room/view-room.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BookedRoomComponent } from './pages/booked-room/booked-room.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PolicyComponent } from './pages/policy/policy.component';

export const routes: Routes = [
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'rooms', component: RoomsComponent},
    {path: 'rooms/all', component: AllRoomsComponent},
    {path: 'rooms/booked/:id', component: BookedRoomComponent},
    {path: 'rooms/:id', component: ViewRoomComponent},
    {path: 'rooms/:id/checkout', component: CheckoutComponent},
    {path: 'facilities', component: FacilitiesComponent},
    {path: 'contact-us', component: ContactComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'privacy-policy', component: PolicyComponent},
];
