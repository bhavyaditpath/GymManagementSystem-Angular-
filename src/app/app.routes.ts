import { Routes } from '@angular/router';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';

export const routes: Routes = [
  // { path: 'navbar', component: NavbarComponent },
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
  { path: '', redirectTo: '/secure', pathMatch: 'full' },
];
