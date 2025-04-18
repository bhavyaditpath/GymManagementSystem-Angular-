import { GenderEnum } from './GenderEnum.model';
import { subscriptionPlanModel } from './plans.model';

export class Member {
  memberId: number = 0;
  firstname?: string; // Added first name
  lastname?: string; // Added last name
  gender?: GenderEnum;
  age?: number;
  subscriptionPlanId?: number;
  joiningDate?: Date = new Date();
  email?: string;
  phoneNumber: string = '';
  isActive: boolean = false;
  memberImagePath?: string;
  memberImageName?: string;

  constructor() {}
}
