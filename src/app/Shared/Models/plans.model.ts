export class subscriptionPlanModel {
  subscriptionPlanId?: number;
  planName?: string;
  planDuration?: number;
  planPrice?: number;
  description?: string;
  isActive?: boolean = false;

  constructor() {}
}
