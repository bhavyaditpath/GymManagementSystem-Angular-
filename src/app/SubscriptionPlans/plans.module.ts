import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansRoutingModule } from './plans-routing.module';
import { PlanDetailComponent } from './Components/plan-detail/plan-detail.component';
import { PlanListComponent } from './Components/plan-list/plan-list.component';
import { PlanFormComponent } from './Components/plan-form/plan-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { Toast } from 'primeng/toast';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Checkbox } from 'primeng/checkbox';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@NgModule({
  declarations: [PlanDetailComponent, PlanListComponent, PlanFormComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    Toast,
    ConfirmPopup,
    Checkbox,
    ConfirmDialog,
    IconField,
    InputIcon
  ],
  providers: [ConfirmationService, MessageService],
})
export class PlansModule {}
