import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { LandingPage } from './components/landing-page/landing-page';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    { path: 'landingPage', component: LandingPage },
    { path: '**', redirectTo: 'landingPage' },
];
