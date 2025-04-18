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
  ) { }

  ngOnInit(): void {
    const memberId = this.route.snapshot.params['id'];
    this.loadSubscriptionPlans();

    if (!memberId) {
      this.model.joiningDate = new Date();
    }

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

  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      this.selectedFile = file; // THIS LINE IS MISSING
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removePreviewImage(): void {
    this.previewImageUrl = null;
    this.selectedFile = null; // optional: reset selected file
  }

  onSubmit(form: NgForm): void {
    if (!this.validateForm(form)) return;

    if (this.model.joiningDate) {
      const localDate = new Date(this.model.joiningDate);
      localDate.setHours(0, 0, 0, 0);
      const year = localDate.getFullYear();
      const month = localDate.getMonth();
      const day = localDate.getDate();
      this.model.joiningDate = new Date(Date.UTC(year, month, day));
    }

    if (this.isEditMode) {
      this.memberService
        .updateMember(this.model.memberId!, this.model)
        .subscribe({
          next: (response) => {
            // Optional: Update model with response data if returned
            this.model.memberImagePath =
              response?.memberImagePath ?? this.model.memberImagePath;
            this.previewImageUrl = this.apiService.getImageUrl(
              this.model.memberImagePath ?? ''
            );
            this.handleImageUpload(this.model.memberId!, this.selectedFile);
          },
          error: (err) => {
            console.error('Error updating member:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update member.',
            });
          },
        });
    } else {
      this.memberService
        .createMember(this.model.memberId!, this.model)
        .subscribe({
          next: (data) => {
            if (data?.member?.memberId) {
              this.model.memberImagePath = data.member.memberImagePath ?? '';
              this.previewImageUrl = this.apiService.getImageUrl(
                this.model.memberImagePath
              );
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
  // getting image null here
  private handleImageUpload(memberId: number, imageFile: File | null): void {
    debugger;
    if (imageFile) {
      debugger;
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
