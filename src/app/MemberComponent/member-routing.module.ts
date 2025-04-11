import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './Components/member-list/member-list.component';
import { MemberFormComponent } from './Components/member-form/member-form.component';
import { MemberDetailsComponent } from './Components/member-details/member-details.component';

const routes: Routes = [
  { path: '', component: MemberListComponent },
  { path: 'createMember', component: MemberFormComponent },
  { path: 'editMember/:id', component: MemberFormComponent },
  { path: 'memberDetails/:id', component: MemberDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
