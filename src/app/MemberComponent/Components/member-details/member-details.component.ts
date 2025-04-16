import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../Services/member.service';
import { Member } from '../../../Shared/Models/member.model';
import { ApiService } from '../../../Shared/ApiService/api.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  standalone: false,
})
export class MemberDetailsComponent implements OnChanges {
  @Input() memberId!: number;

  member!: Member;

  constructor(
    private memberService: MemberService,
    private apiService: ApiService
  ) {}

  ngOnChanges(): void {
    if (this.memberId) {
      this.memberService.getMemberById(this.memberId).subscribe({
        next: (data) => {
          data.joiningDate = data.joiningDate
            ? new Date(data.joiningDate)
            : undefined;
          this.member = {
            ...data,
            memberImagePath: this.apiService.getImageUrl(
              data.memberImagePath ?? ''
            ),
          };
          console.log(this.member);
        },
        error: (err) => {
          console.error('Error loading member details:', err);
        },
      });
    }
  }
}
