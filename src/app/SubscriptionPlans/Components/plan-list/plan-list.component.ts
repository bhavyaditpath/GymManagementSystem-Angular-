import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlansService } from '../../Services/plans.service';
import { subscriptionPlanModel } from '../../../Shared/Models/plans.model';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
  standalone: false,
})
export class PlanListComponent implements OnInit {
  plans: subscriptionPlanModel[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  globalFilter: string = '';
  selectedPlanId: number | null = null;
  displayDetailDialog: boolean = false;

  constructor(
    private planService: PlansService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.loading = true;
    this.planService.getPlans().subscribe({
      next: (response) => {
        this.plans = response;
        this.totalRecords = response.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading plans:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load plans.',
        });
        this.loading = false;
      },
    });
  }

  viewDetails(planId: number): void {
    this.selectedPlanId = planId;
    this.displayDetailDialog = true;
  }

  addPlan() {
    this.router.navigate(['/secure/SubscriptionPlans/createPlan']);
  }

  editPlan(id: number) {
    this.router.navigate([`/secure/SubscriptionPlans/editPlan/${id}`]);
  }

  confirmDelete(planId: number, key: string): void {
    this.confirmationService.confirm({
      key: key,
      message: `Are you sure you want to delete this plan?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.planService.deletePlan(planId).subscribe({
          next: () => {
            this.plans = this.plans.filter(
              (plan) => plan.subscriptionPlanId !== planId
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Plan deleted successfully',
            });
          },
          error: (err) => {
            console.error('Error deleting plan:', err);
  
            if (err.status === 409) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Cannot Delete',
                detail: 'This plan is associated with active members, you can deactivate this plan instead',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete plan',
              });
            }
          },
        });
      },
    });
  }
  

  toggleAction(event: Event, plan: subscriptionPlanModel, key: string) {
    const action = plan.isActive ? 'Activate' : 'Deactivate';
    this.confirmationService.confirm({
      key: key,
      target: event.target as EventTarget,
      message: `Are you sure you want to ${action} this plan?`,
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: action,
        severity: plan.isActive ? 'success' : 'danger',
      },
      accept: () => {
        this.isActivate(plan); // Now this will include backend update
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: `You cancelled the ${action.toLowerCase()} action.`,
          life: 2000,
        });
      },
    });
  }

  isActivate(plan: subscriptionPlanModel) {
    const originalStatus = plan.isActive;
    plan.isActive = !plan.isActive;

    this.planService.updatePlan(plan.subscriptionPlanId!, plan).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Plan ${
            plan.isActive ? 'deactivated' : 'activated'
          } successfully.`,
          life: 2000,
        });
      },
      error: (err) => {
        console.error('Error updating plan:', err);
        plan.isActive = originalStatus; // Revert the change
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to ${
            plan.isActive ? 'activate' : 'deactivate'
          } the plan.`,
          life: 2000,
        });
      },
    });
  }

  getValues(event: any) {
    console.log(event);
    console.log(event.target.value);
    return event.target.value;
  }
}
