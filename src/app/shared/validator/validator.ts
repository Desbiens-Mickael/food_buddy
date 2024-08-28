import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(control.value as string);
    return valid ? null : { invalidEmail: true };
  };
}
export function sirenValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valeur: string = control.value as string;
    const valid = valeur.length === 9;
    return valid ? null : { invalidSiren: true };
  };
}
export function siretValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valeur: string = control.value as string;
    const valid = valeur.length === 5;
    return valid ? null : { invalidSiret: true };
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value as string;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const validLength = password ? password.length >= 8 : false;
    const valid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      validLength;
    return valid ? null : { invalidPassword: true };
  };
}

export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string,
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const formGroup = group as FormGroup;
    const password = formGroup.controls[passwordKey];
    const confirmPassword = formGroup.controls[confirmPasswordKey];
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
    return null;
  };
}
