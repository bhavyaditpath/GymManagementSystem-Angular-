// no-whitespace-email.directive.ts

import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoWhitespaceEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoWhitespaceEmailDirective,
      multi: true,
    },
  ],
})
export class NoWhitespaceEmailDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    
    if (!value) return null;

    // Check for leading, trailing, or any whitespace
    if (value.trim() !== value || /\s/.test(value)) {
      return { noWhitespaceEmail: true };
    }

    return null;
  }
}
