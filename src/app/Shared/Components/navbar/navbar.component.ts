import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Member',
        command: () => {
          this.router.navigate(['/secure/member']);
        },
      },
      {
        label: 'Plans',
        command: () => {
          this.router.navigate(['/secure/SubscriptionPlans']);
        },
      },
    ];
  }
}
