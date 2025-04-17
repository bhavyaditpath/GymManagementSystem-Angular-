import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../../Services/member.service';
import { Member } from '../../../Shared/Models/member.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlansService } from '../../../SubscriptionPlans/Services/plans.service';
import { subscriptionPlanModel } from '../../../Shared/Models/plans.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  standalone: false,
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  plans: subscriptionPlanModel[] = [];
  globalFilter: string = '';
  showDetailsDialog: boolean = false;
  selectedMemberId!: number;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private MessageService: MessageService,
    private plansService: PlansService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptionPlans();
    this.loadMembers();
  }

  loadSubscriptionPlans(): void {
    this.plansService.getAllPlansIncludingDeleted().subscribe({
      next: (plans) => {
        this.plans = plans;
        console.log(this.plans);
      },
      error: (err) => {
        console.error('Error fetching subscription plans:', err);
      },
    });
  }

  loadMembers() {
    this.loading = true;
    this.memberService.getMembers().subscribe({
      next: (response: Member[]) => {
        console.log('API Response:', response);

        this.members = response.map((member) => {
          const plan = this.plans.find(
            (p) => p.subscriptionPlanId === member.subscriptionPlanId
          );
          return {
            ...member,
            fullName: `${member.firstname} ${member.lastname}`,
            subscriptionPlanName: plan?.planName || 'No Plan',
          };
        });

        this.totalRecords = this.members.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading members:', err);
        alert('Failed to load members');
        this.loading = false;
      },
    });
  }

  getSubscriptionPlanName(subscriptionPlanId: number): string {
    if (!subscriptionPlanId) return 'No Plan';
    const plan = this.plans.find(
      (p) => p.subscriptionPlanId === subscriptionPlanId
    );
    return plan?.planName || 'No Plan';
  }

  viewDetails(id: number): void {
    this.selectedMemberId = id;
    this.showDetailsDialog = true;
  }

  editMember(id: number): void {
    console.log('Edit member with ID:', id);
    this.router.navigate([`/secure/member/editMember/${id}`]);
  }

  addMember(): void {
    this.router.navigate(['/secure/member/createMember']);
  }

  confirmDelete(memberId: number, key: string): void {
    this.confirmationService.confirm({
      key: key,
      message: `Are you sure you want to delete this member ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.memberService.deleteMember(memberId).subscribe({
          next: () => {
            this.members = this.members.filter((m) => m.memberId !== memberId);
            this.MessageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `member deleted successfully`,
            });
          },
          error: (err) => {
            console.error('Error deleting member:', err);
            this.MessageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to delete member`,
            });
          },
        });
      },
    });
  }

  toggleAction(event: Event, member: Member, key: string): void {
    const action = member.isActive ? 'Activate' : 'Deactivate';
    this.confirmationService.confirm({
      key: key,
      target: event.target as EventTarget,
      message: `Are you sure you want to ${action} this member`,
      icon: 'pi pi-info-circle',
      header: 'Confirm',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: action,
        severity: member.isActive ? 'success' : 'danger',
      },
      accept: () => {
        this.isActivate(member); // Backend update
      },
      reject: () => {
        this.MessageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: `You cancelled the ${action.toLowerCase()} action.`,
          life: 2000,
        });
      },
    });
  }
  isActivate(member: Member): void {
    const originalStatus = member.isActive;
    member.isActive = !member.isActive;

    this.memberService.updateMember(member.memberId, member).subscribe({
      next: () => {
        this.MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${member.firstname} ${member.lastname} ${
            member.isActive ? 'activated' : 'deactivated'
          } successfully.`,
          life: 2000,
        });
      },
      error: (err) => {
        console.error('Error updating member:', err);
        member.isActive = originalStatus; // Revert status on error
        this.MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to ${member.isActive ? 'activate' : 'deactivate'} ${
            member.firstname
          } ${member.lastname}.`,
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
