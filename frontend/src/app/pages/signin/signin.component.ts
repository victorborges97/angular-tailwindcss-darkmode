import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/roles';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './signin.component.html',
})
export class SigninComponent {
    fb: FormBuilder = inject(FormBuilder)
    authService = inject(AuthService);
    router = inject(Router);
    toastr = inject(ToastrService);

    userForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    onSubmit() {
        if (!this.userForm.valid) {
            console.log("not valid")
            this.userForm.markAllAsTouched();
        } else {
            console.log('Form submitted!', this.userForm.value);
            this.authService.login(this.userForm.value.username!, this.userForm.value.password!).then((user) => {
                const role = Role[user.role as Role];
                this.authService.setRole(role);
                this.authService.setUser(user);
                this.router.navigate(['/app']);
            }).catch(e => {
                console.log(e)
                this.toastr.error((e.error.message ?? "Error ao logar").toString());
            });
        }
    }

}
