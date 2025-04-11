import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../Services/member.service';
import { Member } from '../../../Shared/Models/member.model';
import { PlansService } from '../../../SubscriptionPlans/Services/plans.service';
import { subscriptionPlanModel } from '../../../Shared/Models/plans.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
  standalone: false,
})
export class MemberFormComponent implements OnInit {
  model: Member = new Member();
  members: Member[] = [];
  subscriptionPlans: subscriptionPlanModel[] = [];
  selectedFile: File | null = null;
  today: Date = new Date();
  isEditMode = false;
  loading = false;

  genderOptions = [
    { name: 'Male', displayName: 'Male' },
    { name: 'Female', displayName: 'Female' },
    { name: 'Other', displayName: 'Other' },
  ];

  constructor(
    private memberService: MemberService,
    public router: Router,
    private route: ActivatedRoute,
    private subscriptionPlanService: PlansService
  ) {}

  ngOnInit(): void {
    const memberId = this.route.snapshot.params['id'];
    this.loadSubscriptionPlans();

    if (memberId) {
      this.isEditMode = true;
      this.loadMemberById(memberId);
    }
  }

  private loadMemberById(id: number): void {
    this.loading = true;
    this.memberService.getMemberById(id).subscribe({
      next: (response) => {
        this.model = { ...response };
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading member:', err);
        alert('Failed to load member');
        this.loading = false;
      },
    });
  }

  private loadSubscriptionPlans(): void {
    this.subscriptionPlanService.getPlans().subscribe({
      next: (plans) => {
        this.subscriptionPlans = plans;
      },
      error: (err) => {
        console.error('Failed to load subscription plans:', err);
      },
    });
  }

  onFileSelect(event: any): void {
    const file = event?.files?.[0] || event?.target?.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(form: NgForm): void {
    if (!this.validateForm(form)) return;

    if (this.isEditMode) {
      this.memberService
        .updateMember(this.model.memberId!, this.model)
        .subscribe({
          next: () => {
            this.handleImageUpload(this.model.memberId!, this.selectedFile);
                this.navigateToMemberList();
          },
          error: (err) => {
            console.error('Error updating member:', err);
            alert('Failed to update member.');
          },
        });
    } else {
      this.memberService.createMember(this.model.memberId! , this.model).subscribe({
        next: (createdMember) => {
          console.log('Created Member Response:', createdMember);
          if (createdMember?.memberId) {
            this.handleImageUpload(createdMember.memberId, this.selectedFile);
                this.navigateToMemberList();
          } else {
            alert('Member created, but no ID returned. Skipping image upload.');
            this.navigateToMemberList();
          }
        },
        error: (err) => {
          console.error('Error creating member:', err);
          alert('Failed to create member.');
        },
      });
    }
  }

  private handleImageUpload(memberId: number, imageFile: File | null): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      if (memberId != null) {
        formData.append('memberId', memberId.toString()); // ✅ Safer call
      }

      this.memberService
        .uploadProfileImage(memberId, this.selectedFile)
        .subscribe({
          next: () => {
            alert('Member and image uploaded successfully');
            this.navigateToMemberList();
          },
          error: (err) => {
            console.error('Image upload failed:', err);
            alert('Member saved, but image upload failed.');
            this.navigateToMemberList();
          },
        });
    } else {
      alert('Member saved successfully');
      this.navigateToMemberList();
    }
  }

  private validateForm(form: NgForm): boolean {
    if (form.invalid) {
      alert('Please fill out the form correctly.');
      return false;
    }
    return true;
  }

  private navigateToMemberList(): void {
    this.router.navigate(['/secure/member']);
  }
}
