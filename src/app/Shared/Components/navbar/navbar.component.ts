import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Menubar, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  rightItems: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Member',
        icon: 'pi pi-users',
        command: () => {
          this.router.navigate(['/secure/member']);
        },
      },
      {
        label: 'Plans',
        icon: 'pi pi-list',
        command: () => {
          this.router.navigate(['/secure/SubscriptionPlans']);
        },
      }
    ];
    this.rightItems = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      }
    ]

  }

  logout() {
    localStorage.clear(); 
    this.router.navigate(['/auth/login']);
  }
}
