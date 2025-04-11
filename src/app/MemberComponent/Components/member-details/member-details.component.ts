import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../Services/member.service';
import { Member } from '../../../Shared/Models/member.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  standalone: false,
})
export class MemberDetailsComponent implements OnChanges {
  @Input() memberId!: number;

  member!: Member;

  constructor(private memberService: MemberService) {}

  ngOnChanges(): void {
    if (this.memberId) {
      this.memberService.getMemberById(this.memberId).subscribe({
        next: (data) => {
          this.member = data;
        },
        error: (err) => {
          console.error('Error loading member details:', err);
        },
      });
    }
  }
}
