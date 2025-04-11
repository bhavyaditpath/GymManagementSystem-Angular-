import { Component, Input, OnChanges } from '@angular/core';
import { subscriptionPlanModel } from '../../../Shared/Models/plans.model';
import { PlansService } from '../../Services/plans.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plan-detail',
  standalone: false,
  templateUrl: './plan-detail.component.html',
  styleUrl: './plan-detail.component.css',
})
export class PlanDetailComponent implements OnChanges {
  @Input() planId!: number;
  plan: subscriptionPlanModel | null = null;

  constructor(
    private planService: PlansService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnChanges(): void {
    if (this.planId) {
      this.loadPlanDetails(this.planId);
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const planId = params['id'];
      console.log('Plan ID:', planId); // Debugging
      if (planId) {
        this.loadPlanDetails(planId);
      }
    });
  }

  loadPlanDetails(id: number): void {
    this.planService.getPlanById(id).subscribe({
      next: (data) => {
        this.plan = data;
      },
      error: (err) => {
        console.error('Error loading plan details:', err);
        alert('Failed to load plan details.');
      },
    });
  }

  navigateToPlanList(): void {
    this.router.navigate(['/secure/SubscriptionPlans']);
  }
}
