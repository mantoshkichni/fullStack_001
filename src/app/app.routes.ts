import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { LandingPage } from './components/landing-page/landing-page';
import { Profile } from './components/profile/profile';
import { Message } from './components/message/message';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    { path: 'landingPage', component: LandingPage },
    {path:'profile', component:Profile},
    {path :'message', component:Message},
    { path: '**', redirectTo: 'landingPage' },
];
