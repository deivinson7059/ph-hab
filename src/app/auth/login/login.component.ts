import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsToastrService, NgxDanisoftUtilsService } from 'ngx-danisoft-utils';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'pg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: UtilsToastrService,
    private el: ElementRef,
    private utilsService: NgxDanisoftUtilsService,
    private fb: FormBuilder
  ) {}

  loginForm: FormGroup = new FormGroup({});

  fieldTextType: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      txtEmail: ['', Validators.required],
      txtPassword: ['', Validators.required],
    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  async onSubmit(): Promise<void> {
    /* // Asegúrate de que el formulario sea válido
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, rellena todos los campos correctamente.';
      return;
    } */

    const { txtPassword, txtEmail } = this.loginForm.value;
    // Intentar iniciar sesión
    try {
      const success = await this.authService.login(txtEmail, txtPassword);
      console.log('success::', success);
      if (success) {
        this.router.navigate(['/admin/home']); // Redirigir a la página principal
      } else {
        this.errorMessage = 'Email o contraseña incorrectos';
      }
    } catch (error) {
      console.error(error); // Registrar el error en la consola
      this.errorMessage =
        'Hubo un problema al iniciar sesión. Inténtalo de nuevo.';
    }
  }
}
