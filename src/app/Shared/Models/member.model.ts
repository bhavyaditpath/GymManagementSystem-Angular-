import { GenderEnum } from './GenderEnum.model';

export class Member {
  memberId: number = 0;
  firstname?: string; // Added first name
  lastname?: string; // Added last name
  gender?: GenderEnum;
  age?: number;
  subscriptionPlanId?: Number;
  joiningDate?: Date;
  email?: string;
  phoneNumber: string = '';
  isActive: boolean = false;
  profileImageUrl?: File;
  memberImagePath?: string;
  memberImageName?: string;

  constructor() {}
}
