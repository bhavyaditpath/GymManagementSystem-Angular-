import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberRoutingModule } from './member-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MemberListComponent } from './Components/member-list/member-list.component';
import { MemberDetailsComponent } from './Components/member-details/member-details.component';
import { MemberFormComponent } from './Components/member-form/member-form.component';
import { MemberService } from './Services/member.service';
import { InputNumber } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Select } from 'primeng/select';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { Checkbox } from 'primeng/checkbox';
import { CalendarIcon } from 'primeng/icons';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    MemberDetailsComponent,
    MemberListComponent,
    MemberFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MemberRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputNumber,
    ConfirmPopupModule,
    Toast,
    ConfirmDialogModule,
    Select,
    IconField,
    InputIcon,
    InputMaskModule,
    Checkbox,
    CalendarIcon,
    CalendarModule,

  ],
  exports: [MemberDetailsComponent],
  providers: [ConfirmationService, MessageService], // Add ConfirmationService and MessageService here
})
export class MemberModule {
  // constructor(private memberService: MemberService) {
  //   console.log('MemberModule loaded');
  // }
}
