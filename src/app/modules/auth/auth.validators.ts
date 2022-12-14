import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AuthValidators {
    static MatchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);

            const error = sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
                ? { confirmMismatch: 'pages.auth.password.errors.confirmMismatch' }
                : null;

            targetCtrl?.setErrors(error);

            return error;
        };
    }
    static APIKeyDescriptionValidator(control: AbstractControl): ValidationErrors | null {
        const DESCRIPTION_PATTERN = /^[A-Za-z]\w{1,13}[A-Za-z0-9]$/;

        const value = control.value;
        let result = null;

        if (value) {
            if (value.length < 3) {
                result = {
                    apikeyDescriptionShort: 'pages.auth.apikeys.errors.apikeyDescriptionShort'
                };
            } else if (!DESCRIPTION_PATTERN.test(value)) {
                result = {
                    apikeyDescriptionPattern: 'pages.auth.apikeys.errors.apikeyDescriptionPattern'
                };
            }
        }

        return result;
    }
}
