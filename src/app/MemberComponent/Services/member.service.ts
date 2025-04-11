import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../Shared/Models/member.model';
import { ApiService } from '../../Shared/ApiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly endpoint = 'Member';
  constructor(private apiService: ApiService) {}

  getMembers(params?: any): Observable<Member[]> {
    // console.log('Calling API:', this.endpoint, 'with params:', params);
    return this.apiService.getData<Member[]>(this.endpoint, params);
  }

  getMemberById(id: number): Observable<Member> {
    const fullUrl = `${this.endpoint}/${id}`;
    return this.apiService.getDataWithParams<Member>(fullUrl, {});
  }

  createMember(id:Number, member: Member): Observable<Member> {
    return this.apiService.postData<Member>(this.endpoint, member);
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.apiService.putData<Member>(`${this.endpoint}/${id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.apiService.deleteData(`${this.endpoint}/${id}`);
  }

  toggleMemberStatus(id: number, isActive: boolean): Observable<Member> {
    return this.apiService.patchData<Member>(`${this.endpoint}/${id}`, {
      isActive,
    });
  }

  uploadProfileImage(memberId: number, file: File): Observable<Member> {
    const formData = new FormData();
    formData.append('MemberId', memberId.toString());
    formData.append('ImageFile', file);
    const url = `${this.endpoint}/upload-image`;
    console.log('Uploading image with formData:', url, formData);
    return this.apiService.postData<Member>(url, formData);
  }

  getProfileImageUrl(memberId: number): Observable<string> {
    const url = `${this.endpoint}/${memberId}/images`;
    return this.apiService.getData<string>(url);
  }
}
