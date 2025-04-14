import { Routes } from '@angular/router';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./AuthComponent/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  { path: '', redirectTo: '/auth/register', pathMatch: 'full' },   
  {
    path: 'secure',
    component: NavbarComponent,
    children: [
      {
        path: 'member',
        loadChildren: () =>
          import('./MemberComponent/member.module').then((m) => m.MemberModule),
      },
      {
        path: 'SubscriptionPlans',
        loadChildren: () =>
          import('./SubscriptionPlans/plans.module').then((m) => m.PlansModule),
      },
      { path: '', redirectTo: '/secure/member', pathMatch: 'full' },
    ],
  },
  // { path: '', redirectTo: '/secure', pathMatch: 'full' },
];
