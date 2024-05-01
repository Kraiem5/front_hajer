import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  public form!: FormGroup;

  ngOnInit(): void {

    this.form = this.fb.group({
      nom: new FormControl('', Validators.required),//obligatoirr
      prenom: new FormControl('', Validators.required),//obligatoirr
      email: new FormControl('', Validators.email),// doit être un email
      telephone: new FormControl('', Validators.required),// doit être un email
      cin: new FormControl('', Validators.required),// doit être un email
      role: new FormControl(''),// doit être un email
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  roles = [
    { name: 'ADMIN', abbrev: 'ADMIN' },
    { name: 'Scrum Master', abbrev: 'ING' },
    { name: 'Manager', abbrev: 'TECH' },
  ];
  public onSubmit(): void {
    if (this.form?.valid) {
      const { nom, prenom, email, telephone, cin, role, password } = this.form.value;
      const confirmPassword = this.form.get('confirmPassword')?.value;

      if (password === confirmPassword) {
        this.auth.register(nom, prenom, email, telephone, cin, role, password)
          .subscribe((data) => {
            // Handle successful registration response
            console.log(data);
            // You can optionally clear the form or redirect to another page here
          }, (error) => {
            // Handle server-side validation errors (if applicable)
            console.error(error);
            const errorMsg = error.error?.message || 'An error occurred during registration.';
            alert(errorMsg);
          });
      } else {
        alert('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
      }
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
    console.log(this.form);

  }

  convertObjectToString(obj: any) {
    return Object.entries(obj)
      .map(([key, value]) => `${key} ${value}`)
      .join(' ');
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
