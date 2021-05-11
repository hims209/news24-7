import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // return null if controls have n't initialized yet.
    if (!control || !matchingControl) {
      return null;
    }

    // here i am going to check that if matchingcontrol/confirmpassword has any error then return null.
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return null;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
