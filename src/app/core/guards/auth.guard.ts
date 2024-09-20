import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // El token es válido y no ha expirado
    } else {
      this.router.navigate(['/auth/login']); // Redirigimos al login si el token es inválido o ha expirado
      return false;
    }
  }
}
