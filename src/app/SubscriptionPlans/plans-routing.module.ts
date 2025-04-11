import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanListComponent } from './Components/plan-list/plan-list.component';
import { PlanFormComponent } from './Components/plan-form/plan-form.component';
import { PlanDetailComponent } from './Components/plan-detail/plan-detail.component';

const routes: Routes = [
  { path: '', component: PlanListComponent },
  { path: 'createPlan', component: PlanFormComponent },
  { path: 'editPlan/:id', component: PlanFormComponent },
  { path: 'planDetails/:id', component: PlanDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
