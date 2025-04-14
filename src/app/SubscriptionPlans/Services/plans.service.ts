import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Shared/ApiService/api.service';
import { subscriptionPlanModel } from '../../Shared/Models/plans.model';
import { API_URLS } from '../../Shared/constants/apiurls.constant';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private readonly endpoint = API_URLS.subscriptionPlanUrl;

  constructor(private apiService: ApiService) {}

  getPlans(params?: any): Observable<subscriptionPlanModel[]> {
    return this.apiService.getData<subscriptionPlanModel[]>(
      this.endpoint,
      params
    );
  }

  getPlanById(id: number): Observable<subscriptionPlanModel> {
    const fullUrl = `${this.endpoint}/${id}`;
    return this.apiService.getDataWithParams<subscriptionPlanModel>(
      fullUrl,
      {}
    );
  }

  createPlan(plan: subscriptionPlanModel): Observable<subscriptionPlanModel> {
     console.log('POST Request Body:', plan);
    return this.apiService.postData<subscriptionPlanModel>(this.endpoint, plan);
  }

  updatePlan(
    id: number,
    plan: subscriptionPlanModel
  ): Observable<subscriptionPlanModel> {
    return this.apiService.putData<subscriptionPlanModel>(
      `${this.endpoint}/${id}`,
      plan
    );
  }

  deletePlan(id: number): Observable<void> {
    return this.apiService.deleteData<void>(`${this.endpoint}/${id}`);
  }

  togglePlanStatus(
    id: number,
    activate: boolean
  ): Observable<subscriptionPlanModel> {
    return this.apiService.patchData<subscriptionPlanModel>(
      `${this.endpoint}/${id}`,
      { activate }
    );
  }
}
