import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';
import { MustMatch } from '../utils/must-match.validator';

@Directive({
  selector: '[mustMatch]',
  providers: [
    {
      // thsi is the way to register the validator.
      provide: NG_VALIDATORS, // will inform that it is a angular validator
      useExisting: MustMatchDirective, // name of the validator class
      multi: true, // will give u a support across the application.
    },
  ],
})
export class MustMatchDirective implements Validator {
  @Input()
  mustMatch: string[] = [];
  constructor() {}

  validate(formGroup: FormGroup) {
    return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }
}
