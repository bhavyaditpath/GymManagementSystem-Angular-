import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../Services/member.service';
import { Member } from '../../../Shared/Models/member.model';
import { ApiService } from '../../../Shared/ApiService/api.service';
import { PlansService } from '../../../SubscriptionPlans/Services/plans.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  standalone: false,
})
export class MemberDetailsComponent implements OnChanges {
  @Input() memberId!: number;

  member!: Member;
  planName: string = '';

  constructor(
    private memberService: MemberService,
    private apiService: ApiService,
    private plansService: PlansService
  ) {}

  ngOnChanges(): void {
    if (this.memberId) {
      this.memberService.getMemberById(this.memberId).subscribe({
        next: (data) => {
          data.joiningDate = data.joiningDate ? new Date(data.joiningDate) : undefined;
  
          this.member = {
            ...data,
            memberImagePath: this.apiService.getImageUrl(data.memberImagePath ?? ''),
          };
  
          // Fetch plan name from API using subscriptionPlanId (which is a number)
          if (data.subscriptionPlanId) {
            this.plansService.getPlanById(data.subscriptionPlanId).subscribe({
              next: (plan) => {
                this.planName = plan.planName ?? 'No Plan';
              },
              error: () => {
                this.planName = 'No Plan';
              },
            });
          } else {
            this.planName = 'No Plan';
          }
  
          console.log(this.member);
        },
        error: (err) => {
          console.error('Error loading member details:', err);
        },
      });
    }
  }
  
  
}
