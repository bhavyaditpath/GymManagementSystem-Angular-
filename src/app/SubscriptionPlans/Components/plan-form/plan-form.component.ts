import { Component } from '@angular/core';
import { subscriptionPlanModel } from '../../../Shared/Models/plans.model';
import { PlansService } from '../../Services/plans.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-plan-form',
  standalone: false,
  templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.css',
})
export class PlanFormComponent {
  model: subscriptionPlanModel = new subscriptionPlanModel();

  isEditMode: boolean = false;
  timePeriodOptions = [
    { name: 'Monthly', displayName: 'Monthly', value: 1 },
    { name: 'Quarterly', displayName: 'Quarterly', value: 3 },
    { name: 'Yearly', displayName: 'Yearly', value: 12 },
  ];

  constructor(
    private planService: PlansService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const planId = this.route.snapshot.params['id'];
    console.log('Plan ID:', planId);
    // this.isEditMode = !planId;

    if (planId) {
      this.isEditMode = true;
      this.loadPlan(planId);
    } else {
      this.isEditMode = false;
      this.model = new subscriptionPlanModel();
    }
  }

  loadPlan(id: number): void {
    this.planService.getPlanById(id).subscribe({
      next: (plans) => {
        console.log('Fetched plan:', plans);
        this.model = plans;
      },
      error: (err) => {
        console.error('Error loading plan:', err);
      },
    });
  }
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill out the form correctly.',
      });
      return;
    }

    console.log('Form Submitted:', this.model);

    if (this.isEditMode) {
      this.planService
        .updatePlan(this.model.subscriptionPlanId!, this.model)
        .subscribe({
          next: () => {
            debugger
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Plan updated successfully',
            });
            this.navigateToPlanList();
          },
          error: (err) => {
            debugger
            if (err.status === 500) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Duplicate Name',
                detail: 'Plan with this name already exists.',
              });
              
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update plan.',
              });
            }
          },
        });
    } else {
      this.planService.createPlan(this.model).subscribe({
        next: () => {
          debugger
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Plan created successfully',
          });
          this.navigateToPlanList();
        },
        error: (err) => {
          debugger
          if (err.status === 409) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Duplicate Name',
              detail: 'Plan with this name already exists.',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create plan.',
            });
          }
        },
      });
    }
  }

  navigateToPlanList(): void {
    this.router.navigate(['/secure/SubscriptionPlans']);
  }
}
