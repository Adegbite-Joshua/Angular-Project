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
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { WriteReviewComponent } from './pages/write-review/write-review.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { GuestsComponent } from './pages/admin/guests/guests.component';
import { AdminRoomsComponent } from './pages/admin/admin-rooms/admin-rooms.component';
import { FrontDeskComponent } from './pages/admin/front-desk/front-desk.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { SignUpComponent } from './pages/admin/sign-up/sign-up.component';
import { AuthGuard } from './guards/admin/auth/auth.guard';
import { SignInComponent } from './pages/admin/sign-in/sign-in.component';

export const routes: Routes = [
    {path: 'home', redirectTo: '/', pathMatch: 'full'},
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
    {path: 'reviews', component: ReviewsComponent},
    {path: 'write-review', component: WriteReviewComponent},
    { path: 'admin/login', component: SignInComponent},
    { path: 'admin/signup', component: SignUpComponent},
    {path: 'admin', children:[
        { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
        { path: 'front-desk', component: FrontDeskComponent, canActivate:[AuthGuard]},
        { path: 'guests', component: GuestsComponent, canActivate:[AuthGuard]},
        { path: 'rooms', component: AdminRoomsComponent, canActivate:[AuthGuard]},
    ]},
    {path: '**', component: Error404Component},
];
