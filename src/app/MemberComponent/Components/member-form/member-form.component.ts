import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../Services/member.service';
import { Member } from '../../../Shared/Models/member.model';
import { PlansService } from '../../../SubscriptionPlans/Services/plans.service';
import { subscriptionPlanModel } from '../../../Shared/Models/plans.model';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../Shared/ApiService/api.service';

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
  previewImageUrl: string | null = null;

  genderOptions = [
    { name: 'Male', displayName: 'Male' },
    { name: 'Female', displayName: 'Female' },
    { name: 'Other', displayName: 'Other' },
  ];

  constructor(
    private memberService: MemberService,
    public router: Router,
    private route: ActivatedRoute,
    private subscriptionPlanService: PlansService,
    private messageService: MessageService,
    private apiService: ApiService
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
        response.joiningDate = response.joiningDate
          ? new Date(response.joiningDate)
          : undefined;
        this.model = { ...response };
        if (this.model.memberImagePath) {
          this.previewImageUrl = this.apiService.getImageUrl(
            this.model.memberImagePath
          );
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading member:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load member',
        });
        this.loading = false;
      },
    });
  }

  private loadSubscriptionPlans(): void {
    this.subscriptionPlanService.getPlans().subscribe({
      next: (plans) => {
        this.subscriptionPlans = plans.filter(
          (plan) => plan.isActive === false
        );
      },
      error: (err) => {
        console.error('Failed to load subscription plans:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load subscription plans',
        });
      },
    });
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removePreviewImage() {
    this.previewImageUrl = null;
  }

  onSubmit(form: NgForm): void {
    if (!this.validateForm(form)) return;
    if (this.isEditMode) {
      this.previewImageUrl = this.apiService.getImageUrl(
        this.model.memberImagePath ?? ''
      );
      console.log(this.previewImageUrl);

      this.memberService
        .updateMember(this.model.memberId!, this.model)
        .subscribe({
          next: () => {
            this.handleImageUpload(this.model.memberId!, this.selectedFile);
          },
          error: (err) => {
            console.error('Error updating member:', err);
            if (err.status === 500) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update member.',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update member.',
              });
            }
          },
        });
    } else {
      this.memberService
        .createMember(this.model.memberId!, this.model)
        .subscribe({
          next: (data) => {
            if (data?.member?.memberId) {
              this.handleImageUpload(data.member.memberId, this.selectedFile);
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail:
                  'Member created, but no ID returned. Skipping image upload.',
              });
              this.navigateToMemberList();
            }
          },
          error: (err) => {
            console.error('Error creating member:', err);
            if (err.status === 409) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create member.',
              });
            }
          },
        });
    }
  }

  private handleImageUpload(memberId: number, imageFile: File | null): void {
    if (imageFile) {
      this.memberService.uploadProfileImage(memberId, imageFile).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Member and image uploaded successfully',
          });
          this.navigateToMemberList();
        },
        error: (err) => {
          console.error('Image upload failed:', err);
          this.messageService.add({
            severity: 'warn',
            summary: 'Partial Success',
            detail: 'Member saved, but image upload failed.',
          });
          this.navigateToMemberList();
        },
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Member saved successfully',
      });
      this.navigateToMemberList();
    }
  }

  private validateForm(form: NgForm): boolean {
    if (form.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill out the form correctly.',
      });
      return false;
    }
    return true;
  }

  private navigateToMemberList(): void {
    this.router.navigate(['/secure/member']);
  }
}
